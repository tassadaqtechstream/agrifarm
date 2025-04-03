import { Container } from "react-bootstrap";

const KnowYourCustomer = () => {
    return (
        <section className=" our-solution-sec">
            <Container>
                <h2 className="display-4 text-center mb-4">
                    KNOW-<span className="text-success">YOUR</span>-CUSTOMER
                </h2>
                <p className="lead text-center mb-5">
                    Know-Your-Customer (KYC) is the process we use to verify the identity and origin of finance of users
                    in our digital market place. Thus, preventing any money laundering and the financing of terrorist
                    activities over our platform, whilst creating a network with only trustworthy agricultural buyers
                    and sellers.
                </p>

                <div className="row">
                    <div className="col-md-6">
                        <h3 className="text-success mb-2">KYC FOR SELLERS</h3>
                        <p>
                            Seller accounts are verified by Agri MP and our partners. They are responsible for reviewing
                            the company's registration document, proof of I.D. and user residence, and proof of company
                            IBAN issues by that seller's bank.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <h3 className="text-success mb-2">KYC FOR BUYERS</h3>
                        <p>
                            Buyer accounts are verified by Agri MP and our partners. The buyer KYC process is equal to
                            the seller's, but is not mandatory unless the buyer want to retract funds from his Agri MP
                            wallet.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default KnowYourCustomer;
