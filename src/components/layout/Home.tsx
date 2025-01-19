import { Layout } from "antd"
import NavHeader from "./NavHeader"
import CardItem from "../manga/CardItem"
const { Footer, Content } = Layout
const Home = () => {
  return (
    <>
      <div className="">
        <Layout >
          <header><NavHeader /></header>
          <div className="max-w-7xl m-auto">
            <Content className=""><CardItem /></Content>
          </div>
          <Footer className="bg-red-400">footer</Footer>
        </Layout>

      </div>
    </>
  )
}

export default Home