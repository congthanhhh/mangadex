import { Layout } from "antd"
import NavHeader from "./NavHeader"
import AppRouter from "../Router/AppRouter"
const { Footer, Content } = Layout
const Home = () => {
  return (
    <>
      <div className="bg-[#f5f5f5]">
        <header><NavHeader /></header>
        <Layout className="max-w-screen-xl m-auto">
          <Content className="">
            <AppRouter />
          </Content>
        </Layout>
        <Footer className="bg-red-400">footer</Footer>
      </div>
    </>
  )
}

export default Home