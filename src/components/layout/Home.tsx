import { Layout } from "antd"
import NavHeader from "./NavHeader"
import AppRouter from "../Router/AppRouter"
import Chapter from "../chapter/Chapter"
const { Footer, Content } = Layout
const Home = () => {
  return (
    <>
      <div className="bg-[#f5f5f5]">
        <header><NavHeader /></header>
        <Layout className="max-w-screen-xl m-auto">
          <Content>
            {/* <AppRouter /> */}
            <Chapter />
          </Content>
        </Layout>
        <Footer className="bg-white mt-2 h-5 border-t">FOOTER</Footer>
      </div>
    </>
  )
}

export default Home