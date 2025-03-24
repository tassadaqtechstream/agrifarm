import { Container } from "react-bootstrap";

const Faq = () => {
    return (
        <>
            <section>
                <Container>
                    <div className="text-center mb-5">
                        <h1>FAQ</h1>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-4">
                            <h4 className="mb-3">
                                <span className="text-success">Q1:</span> Who are the sellers?
                            </h4>
                            <p>
                                Sellers are typically producers, farmers and cooperatives of agricultural crops. All
                                sellers are verified by our platform through a seller specific (KYC) process, to keep
                                market wide credibility.
                            </p>
                        </div>
                        <div className="col-12 mb-4">
                            <h4 className="mb-3">
                                <span className="text-success">Q2:</span> Who are the buyers?
                            </h4>
                            <p>
                                Buyers can be referred to as industrial buyers, who may be crop processors, food
                                manufacturers, food retailers, etc. All buyers are verified with a buyer specific (KYC)
                                process.
                            </p>
                        </div>
                        <div className="col-12 mb-4">
                            <h4 className="mb-3">
                                <span className="text-success">Q3:</span> What is kyc?
                            </h4>
                            <p>
                                Know-Your-Customer (KYC) is the process we use to verify the identity of our platform
                                users, assessing their reliability and trustworthiness to perform digital crop
                                transactions over the Agri Marketplace platform. To obtain a KYC verified account, we
                                require the user to provide us with 1. company registration, 2. proof of user ID and
                                address, and 3. proof of company IBAN.
                            </p>
                        </div>
                        <div className="col-12 mb-4">
                            <h4 className="mb-3">
                                <span className="text-success">Q4:</span> Are contracts legally binding?
                            </h4>
                            <p>
                                YES! Once both parties agree upon the terms & conditions of their transactional deal,
                                then these terms and conditions become legally binding. This makes sure that both buyer
                                and/or seller take full responsibility if a transaction is not performed in accordance
                                to the agreed upon terms & conditions.
                            </p>
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn btn-outline-success w-100 font-weight-bold">Show more</button>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Faq;
