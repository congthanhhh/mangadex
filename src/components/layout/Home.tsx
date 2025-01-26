import { Layout } from "antd"
import NavHeader from "./NavHeader"
import AppRouter from "../Router/AppRouter"
import CardDetail from "../mangaDetail/CardDetail"
const { Footer, Content } = Layout
const Home = () => {
  return (
    <>
      <div className="bg-[#f5f5f5]">
        <header><NavHeader /></header>
        <Layout className="max-w-screen-xl m-auto">
          <Content>
            {/* <AppRouter /> */}
            <CardDetail />
          </Content>
        </Layout>
        <Footer className="bg-red-400">footer</Footer>
      </div>
    </>
  )
}

export default Home