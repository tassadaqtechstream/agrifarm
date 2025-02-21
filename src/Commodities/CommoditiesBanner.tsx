import { Container } from 'react-bootstrap'
import CommoditiesTabs from './CommoditiesTabs'

const CommoditiesBanner = () => {
  return (
    <>
      <section className="commodities-section">
                <Container>
                    <h2 className="text-center text-white text-uppercase">
                        Select a product to buy/sell
                    </h2>
                    <CommoditiesTabs />
                </Container>
            </section>
      
    </>
  )
}

export default CommoditiesBanner
