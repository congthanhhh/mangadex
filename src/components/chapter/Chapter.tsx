import { Breadcrumb, Button } from "antd"
import Page from "./Page"
import { MenuOutlined, VerticalLeftOutlined, VerticalRightOutlined } from "@ant-design/icons"


const Chapter = () => {
    return (
        <div className="">
            <div className="py-2">
                <div className="flex flex-col items-center">
                    <div className="">
                        <Breadcrumb
                            className="capitalize"
                            separator=">"
                            items={[
                                {
                                    href: '',
                                    title: 'Trang chủ',
                                },
                                {
                                    href: '',
                                    title: (
                                        <span className="text-red-500">
                                            {`One piece: Đảo hải tặc`}
                                        </span>
                                    ),
                                },
                                {
                                    href: '',
                                    title: 'Chương #300',
                                },
                            ]}
                        />
                    </div>
                    <div className="">
                        <div className="">
                            <Button
                                icon={<VerticalRightOutlined />}
                                color="default" variant="text" size="large"
                                className="text-stone-500" />
                            <Button
                                icon={<MenuOutlined />}
                                color="default" variant="text" size="large"
                                className="text-stone-500" />
                            <Button
                                icon={<VerticalLeftOutlined />}
                                color="default" variant="text" size="large"
                                className="text-stone-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chapter