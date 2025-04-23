import React from "react";

const FAQ: React.FC = () => {
    const faqs = [
        {
            question: "What is a pre-harvest contract?",
            answer: "A pre-harvest contract allows buyers to purchase agricultural products before they are harvested. It secures your supply and typically locks in a price, providing certainty for both buyers and sellers.",
        },
        {
            question: "What if the crop fails or doesn't meet expected quality?",
            answer: "Our platform includes quality guarantees and crop insurance provisions. Specifics vary by contract, but all include protection for buyers in case of crop failure or quality issues.",
        },
        {
            question: "Can I visit the farm before committing?",
            answer: "Yes. For larger contracts, we encourage farm visits and can arrange virtual or in-person tours of the facilities. This gives buyers confidence in production standards.",
        },
        {
            question: "How is payment structured?",
            answer: "Payment structures vary by contract. Most require a deposit with the balance due upon harvest, while others offer installment plans. All payments are secure and escrow-protected.",
        },
    ];

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-earth-olive-dark mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold text-earth-olive-dark mb-2">{faq.question}</h3>
                        <p className="text-sm text-earth-olive-dark/70">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
