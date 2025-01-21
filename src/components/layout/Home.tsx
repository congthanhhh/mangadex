import { Layout } from "antd"
import NavHeader from "./NavHeader"
import CardMain from "../manga/CardMain"
const { Footer, Content } = Layout
const Home = () => {
  return (
    <>
      <div className="">
        <Layout >
          <header><NavHeader /></header>
          <div className="max-w-screen-xl m-auto">
            <Content className=""><CardMain /></Content>
          </div>
          <Footer className="bg-red-400">footer</Footer>
        </Layout>

      </div>
    </>
  )
}

export default Home