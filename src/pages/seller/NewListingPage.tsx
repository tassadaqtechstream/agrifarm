import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Upload,
  X,
  ImageIcon,
  Star
} from "lucide-react";
import { sellerAPI, type CreateProductData, type Commodity } from "../../utility/Apis.ts";

interface FormErrors {
  [key: string]: string | string[];
}

interface BackendValidationErrors {
  [key: string]: string[];
}

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

const NewListingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categories, setCategories] = useState<Commodity[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Image upload states
  const [featuredImage, setFeaturedImage] = useState<ImageFile | null>(null);
  const [productImages, setProductImages] = useState<ImageFile[]>([]);
  const [imageUploadError, setImageUploadError] = useState("");

  // File input refs
  const featuredImageRef = useRef<HTMLInputElement>(null);
  const productImagesRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<CreateProductData>({
    name: "",
    category_id: 0,
    stock: 0,
    unit: "",
    price: 0,
    currency: "",
    description: "",
    weight: undefined,
    brand: "",
    model: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await sellerAPI.getCategories();

      if (response && Array.isArray(response)) {
        setCategories(response);
      } else if (response?.data && Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.warn('Unexpected categories response format:', response);
        setCategories([]);
      }
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please refresh the page.');
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleInputChange = (name: keyof CreateProductData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (error) setError("");
  };

  // Image handling functions
  const handleFeaturedImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateImageFile(file)) return;

    const imageFile: ImageFile = {
      file,
      preview: URL.createObjectURL(file),
      id: Date.now().toString()
    };

    // Clean up previous preview
    if (featuredImage?.preview) {
      URL.revokeObjectURL(featuredImage.preview);
    }

    setFeaturedImage(imageFile);
    setImageUploadError("");
  };

  const handleProductImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Check total images limit (10 max)
    if (productImages.length + files.length > 10) {
      setImageUploadError("Cannot upload more than 10 images total");
      return;
    }

    const validFiles = files.filter(file => validateImageFile(file));

    const newImages: ImageFile[] = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }));

    setProductImages(prev => [...prev, ...newImages]);
    setImageUploadError("");
  };

  const validateImageFile = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setImageUploadError("Only JPEG, PNG, JPG, GIF, and WebP images are allowed");
      return false;
    }

    if (file.size > maxSize) {
      setImageUploadError("Image size cannot exceed 5MB");
      return false;
    }

    return true;
  };

  const removeFeaturedImage = () => {
    if (featuredImage?.preview) {
      URL.revokeObjectURL(featuredImage.preview);
    }
    setFeaturedImage(null);
    if (featuredImageRef.current) {
      featuredImageRef.current.value = "";
    }
  };

  const removeProductImage = (imageId: string) => {
    setProductImages(prev => {
      const updated = prev.filter(img => img.id !== imageId);
      // Clean up preview URL for removed image
      const removedImage = prev.find(img => img.id === imageId);
      if (removedImage?.preview) {
        URL.revokeObjectURL(removedImage.preview);
      }
      return updated;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.category_id || formData.category_id === 0) {
      newErrors.category_id = "Please select a category";
    }

    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = "Valid stock amount is required";
    }

    if (!formData.unit) {
      newErrors.unit = "Please select a unit";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.currency) {
      newErrors.currency = "Please select a currency";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required";
    }

    if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    }

    if (formData.weight && formData.weight < 0) {
      newErrors.weight = "Weight must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBackendErrors = (backendErrors: BackendValidationErrors) => {
    const formErrors: FormErrors = {};

    Object.keys(backendErrors).forEach(field => {
      const fieldErrors = backendErrors[field];
      if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
        formErrors[field] = fieldErrors[0];
      }
    });

    setErrors(formErrors);
  };

  // Replace the incomplete API call section in handleSubmit function (around line 280-290)
// with this complete implementation:

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fix the errors below");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();

      // Add text fields
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('category_id', formData.category_id.toString());
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('stock', formData.stock.toString());
      formDataToSend.append('unit', formData.unit);
      formDataToSend.append('currency', formData.currency);

      if (formData.weight) {
        formDataToSend.append('weight', formData.weight.toString());
      }
      if (formData.brand?.trim()) {
        formDataToSend.append('brand', formData.brand.trim());
      }
      if (formData.model?.trim()) {
        formDataToSend.append('model', formData.model.trim());
      }

      const shortDescription = formData.description.substring(0, 150) +
          (formData.description.length > 150 ? '...' : '');
      formDataToSend.append('short_description', shortDescription);

      // Add featured image
      if (featuredImage) {
        formDataToSend.append('featured_image', featuredImage.file);
      }

      // Add product images
      productImages.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image.file);
      });

      console.log('Sending product data with images...');

      // Make the API call using the sellerAPI
      const result = await sellerAPI.createProduct(formDataToSend);
      console.log('API Response:', result);

      if (result.success) {
        setSuccess(result.message);

        // Show approval status message
        if (result.data?.approval_status === 'pending') {
          setSuccess(result.message + " Your product is now pending admin approval.");
        }

        // Clean up image previews
        if (featuredImage?.preview) {
          URL.revokeObjectURL(featuredImage.preview);
        }
        productImages.forEach(img => {
          if (img.preview) {
            URL.revokeObjectURL(img.preview);
          }
        });

        // Reset form
        setFormData({
          name: "",
          category_id: 0,
          stock: 0,
          unit: "",
          price: 0,
          currency: "",
          description: "",
          weight: undefined,
          brand: "",
          model: ""
        });
        setFeaturedImage(null);
        setProductImages([]);

        setTimeout(() => {
          navigate("/seller/listings");
        }, 2500);
      } else {
        // Handle backend validation errors
        if (result.errors) {
          handleBackendErrors(result.errors);
          setError('Please fix the validation errors below');
        } else {
          setError(result.message || 'Failed to create product. Please try again.');
        }
      }
    } catch (err: any) {
      console.error('Error creating product:', err);

      if (err?.isValidationError) {
        handleBackendErrors(err.errors);
        setError('Please fix the validation errors below');
      } else if (err?.response?.status === 422) {
        const validationErrors = err.response.data?.errors;
        if (validationErrors) {
          handleBackendErrors(validationErrors);
          setError('Please fix the validation errors below');
        } else {
          setError(err.response.data?.message || 'Validation failed');
        }
      } else if (err?.response?.status === 403) {
        setError(err.response.data?.message || 'Access denied. Please check your seller status.');
      } else if (err?.response?.status === 401) {
        setError('Please log in to continue');
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getFieldError = (fieldName: string): string => {
    const error = errors[fieldName];
    if (Array.isArray(error)) {
      return error[0] || "";
    }
    return error || "";
  };

  const hasFieldError = (fieldName: string): boolean => {
    return !!errors[fieldName];
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (featuredImage?.preview) {
        URL.revokeObjectURL(featuredImage.preview);
      }
      productImages.forEach(img => {
        if (img.preview) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [featuredImage, productImages]);

  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-earth-olive-dark mb-2">
                Add New Listing
              </h1>
              <p className="text-gray-600">
                Create a new product listing for your store. All products require admin approval before going live.
              </p>
            </div>

            {error && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {success}
                  </AlertDescription>
                </Alert>
            )}

            {imageUploadError && (
                <Alert className="mb-6 border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    {imageUploadError}
                  </AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-8">
              {/* Product Images Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>

                  {/* Featured Image */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Featured Image <Star className="inline h-3 w-3 text-yellow-500" />
                    </Label>
                    <p className="text-xs text-gray-500 mb-3">
                      This will be the main image for your product. Recommended size: 800x800px
                    </p>

                    <div className="space-y-3">
                      {!featuredImage ? (
                          <div
                              onClick={() => featuredImageRef.current?.click()}
                              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 cursor-pointer transition-colors"
                          >
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-sm text-gray-600">Click to upload featured image</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF, WebP up to 5MB</p>
                          </div>
                      ) : (
                          <div className="relative inline-block">
                            <img
                                src={featuredImage.preview}
                                alt="Featured preview"
                                className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                                type="button"
                                onClick={removeFeaturedImage}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                      )}

                      <input
                          ref={featuredImageRef}
                          type="file"
                          accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                          onChange={handleFeaturedImageUpload}
                          className="hidden"
                          disabled={loading}
                      />
                    </div>
                    {hasFieldError('featured_image') && (
                        <p className="text-sm text-red-500 mt-1">{getFieldError('featured_image')}</p>
                    )}
                  </div>

                  {/* Additional Images */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Additional Images (Optional)
                    </Label>
                    <p className="text-xs text-gray-500 mb-3">
                      Add up to 10 additional images to showcase your product from different angles
                    </p>

                    <div className="space-y-3">
                      {productImages.length < 10 && (
                          <button
                              type="button"
                              onClick={() => productImagesRef.current?.click()}
                              disabled={loading}
                              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors w-full disabled:opacity-50"
                          >
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Add more images</p>
                            <p className="text-xs text-gray-500">
                              {productImages.length}/10 images uploaded
                            </p>
                          </button>
                      )}

                      {productImages.length > 0 && (
                          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                            {productImages.map((image) => (
                                <div key={image.id} className="relative">
                                  <img
                                      src={image.preview}
                                      alt="Product preview"
                                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                  />
                                  <button
                                      type="button"
                                      onClick={() => removeProductImage(image.id)}
                                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                            ))}
                          </div>
                      )}

                      <input
                          ref={productImagesRef}
                          type="file"
                          accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                          multiple
                          onChange={handleProductImagesUpload}
                          className="hidden"
                          disabled={loading}
                      />
                    </div>
                    {hasFieldError('images') && (
                        <p className="text-sm text-red-500 mt-1">{getFieldError('images')}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Product Information</h3>

                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input
                      id="productName"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={hasFieldError('name') ? "border-red-500 focus:border-red-500" : ""}
                      disabled={loading}
                      maxLength={255}
                  />
                  {hasFieldError('name') && (
                      <p className="text-sm text-red-500">{getFieldError('name')}</p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  {categoriesLoading ? (
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-gray-500">Loading categories...</span>
                      </div>
                  ) : categories.length === 0 ? (
                      <div className="p-3 border rounded-md bg-yellow-50 border-yellow-200">
                        <span className="text-sm text-yellow-800">No categories available. Please contact admin.</span>
                      </div>
                  ) : (
                      <Select
                          value={formData.category_id.toString()}
                          onValueChange={(value) => handleInputChange('category_id', parseInt(value))}
                          disabled={loading}
                      >
                        <SelectTrigger className={hasFieldError('category_id') ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                              </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  )}
                  {hasFieldError('category_id') && (
                      <p className="text-sm text-red-500">{getFieldError('category_id')}</p>
                  )}
                </div>

                {/* Stock and Unit */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Amount *</Label>
                    <Input
                        id="stock"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Enter stock amount"
                        value={formData.stock || ""}
                        onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                        className={hasFieldError('stock') ? "border-red-500" : ""}
                        disabled={loading}
                    />
                    {hasFieldError('stock') && (
                        <p className="text-sm text-red-500">{getFieldError('stock')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit *</Label>
                    <Select
                        value={formData.unit}
                        onValueChange={(value) => handleInputChange('unit', value)}
                        disabled={loading}
                    >
                      <SelectTrigger className={hasFieldError('unit') ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="ton">Metric Tons</SelectItem>
                        <SelectItem value="piece">Pieces</SelectItem>
                        <SelectItem value="liter">Liters</SelectItem>
                        <SelectItem value="gram">Grams</SelectItem>
                      </SelectContent>
                    </Select>
                    {hasFieldError('unit') && (
                        <p className="text-sm text-red-500">{getFieldError('unit')}</p>
                    )}
                  </div>
                </div>

                {/* Price and Currency */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Unit Price *</Label>
                    <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0.01"
                        max="999999.99"
                        placeholder="Enter price per unit"
                        value={formData.price || ""}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                        className={hasFieldError('price') ? "border-red-500" : ""}
                        disabled={loading}
                    />
                    {hasFieldError('price') && (
                        <p className="text-sm text-red-500">{getFieldError('price')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency *</Label>
                    <Select
                        value={formData.currency}
                        onValueChange={(value) => handleInputChange('currency', value)}
                        disabled={loading}
                    >
                      <SelectTrigger className={hasFieldError('currency') ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="SAR">SAR</SelectItem>
                        <SelectItem value="AED">AED</SelectItem>
                        <SelectItem value="PKR">PKR</SelectItem>
                      </SelectContent>
                    </Select>
                    {hasFieldError('currency') && (
                        <p className="text-sm text-red-500">{getFieldError('currency')}</p>
                    )}
                  </div>
                </div>

                {/* Optional Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (optional)</Label>
                    <Input
                        id="weight"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Weight in kg"
                        value={formData.weight || ""}
                        onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || undefined)}
                        className={hasFieldError('weight') ? "border-red-500" : ""}
                        disabled={loading}
                    />
                    {hasFieldError('weight') && (
                        <p className="text-sm text-red-500">{getFieldError('weight')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand (optional)</Label>
                    <Input
                        id="brand"
                        placeholder="Enter brand name"
                        value={formData.brand || ""}
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                        disabled={loading}
                        maxLength={100}
                    />
                    {hasFieldError('brand') && (
                        <p className="text-sm text-red-500">{getFieldError('brand')}</p>
                    )}
                  </div>
                </div>

                {/* Model Field */}
                <div className="space-y-2">
                  <Label htmlFor="model">Model (optional)</Label>
                  <Input
                      id="model"
                      placeholder="Enter model name"
                      value={formData.model || ""}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      disabled={loading}
                      maxLength={100}
                  />
                  {hasFieldError('model') && (
                      <p className="text-sm text-red-500">{getFieldError('model')}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Product Description *</Label>
                  <Textarea
                      id="description"
                      placeholder="Enter detailed product description, specifications, and quality details"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className={hasFieldError('description') ? "border-red-500" : ""}
                      disabled={loading}
                      maxLength={5000}
                  />
                  <p className="text-xs text-gray-500">
                    {formData.description.length}/5000 characters
                  </p>
                  {hasFieldError('description') && (
                      <p className="text-sm text-red-500">{getFieldError('description')}</p>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/seller/listings")}
                    disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-earth-terracotta hover:bg-earth-terracotta-dark"
                    disabled={loading || categoriesLoading || categories.length === 0}
                >
                  {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                  ) : (
                      'Create Listing'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default NewListingPage;