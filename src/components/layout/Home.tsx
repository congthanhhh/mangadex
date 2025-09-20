import { Layout } from "antd"
import NavHeader from "./NavHeader"
import AppRouter from "../Router/AppRouter"
import Footer from "./Footer"
const { Content } = Layout
const Home = () => {
  return (
    <>
      <div className="bg-[#f5f5f5]">
        <header><NavHeader /></header>
        <Layout className="max-w-screen-xl m-auto">
          <Content>
            <AppRouter />
          </Content>
        </Layout>
        <Footer />
      </div>
    </>
  )
}

export default Home