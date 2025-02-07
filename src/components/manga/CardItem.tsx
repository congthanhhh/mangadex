import { Card, Row, Col, Button, Flex, Tag, Tooltip } from 'antd'
import { assets } from '../../assets/assets'
import { EyeOutlined, UsergroupAddOutlined, StarFilled, TagOutlined } from "@ant-design/icons";

interface IManga {
    title: string;
    body: string;
}
interface CardItemProps {
    manga: IManga[];
    loading: boolean;
}
const CardItem = (props: CardItemProps) => {
    const { manga, loading } = props;
    return (
        <>
            <Row >
                {
                    manga.map((item, index) => (
                        <Col lg={12} key={index}>
                            <div className='p-3'>
                                <div className='flex items-center w-full justify-between text-[12px] font-sans sm:hidden px-2'>
                                    <div className='font-medium leading-5 tracking-wide text-[#757575]'>300 chương</div>
                                    <div className='flex items-center gap-3 text-[#757575]'>
                                        <div>
                                            <span><StarFilled style={{ color: '#fd3' }} /></span>
                                            <span className='font-medium leading-5 tracking-wide pl-1'>5</span>
                                        </div>
                                        <div>
                                            <span><EyeOutlined /></span>
                                            <span className='font-medium leading-5 tracking-wide pl-1'>20,500,000</span>
                                        </div>
                                        <div>
                                            <span><UsergroupAddOutlined /></span>
                                            <span className='font-medium leading-5 tracking-wide pl-1'>40,000</span>
                                        </div>
                                    </div>
                                </div>
                                <Card loading={loading}
                                    hoverable
                                    style={{ height: 180 }}
                                    styles={{ body: { padding: 0, overflow: 'hidden' } }}>
                                    <Flex >
                                        <img className='rounded-md'
                                            alt="avatar"
                                            src={assets.mangaImg}
                                            style={{
                                                display: 'block',
                                                width: 130,
                                                height: 180,
                                            }}
                                        />
                                        <Flex vertical align="flex-end" style={{ padding: 12, position: 'relative' }}>
                                            <div className='sm:flex sm:items-center w-full justify-between text-[12px] font-sans hidden'>
                                                <div className='font-medium leading-5 tracking-wide text-[#757575]'>300 chương</div>
                                                <div className='flex items-center gap-3 text-[#757575]'>
                                                    <div>
                                                        <span><StarFilled style={{ color: '#fd3' }} /></span>
                                                        <span className='font-medium leading-5 tracking-wide pl-1'>5</span>
                                                    </div>
                                                    <div>
                                                        <span><EyeOutlined /></span>
                                                        <span className='font-medium leading-5 tracking-wide pl-1'>20,500,000</span>
                                                    </div>
                                                    <div>
                                                        <span><UsergroupAddOutlined /></span>
                                                        <span className='font-medium leading-5 tracking-wide pl-1'>40,000</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-full'>
                                                <Tooltip title={item.title} arrow={false}>
                                                    <a href="#" className='text-black line-clamp-1 text-base font-medium hover:text-red-700'>
                                                        {item.title}
                                                    </a>
                                                </Tooltip>
                                            </div>
                                            <div className='w-full my-1'>
                                                <Tag icon={<TagOutlined />} className='bg-slate-300 hover:opacity-50 rounded-xl text-[10px] font-medium'>
                                                    <a href="#">Hành Động</a>
                                                </Tag>
                                                <Tag icon={<TagOutlined />} className='bg-slate-300 hover:opacity-50 rounded-xl text-[10px] font-medium'>
                                                    <a href="#">Hành Động</a>
                                                </Tag>
                                            </div>
                                            <div>
                                                <Tooltip title={item.body} arrow={false}>
                                                    <span className='text-[12px] line-clamp-3 font-sans leading-4 tracking-wide'>
                                                        {item.body}
                                                    </span>
                                                </Tooltip>
                                            </div>
                                            <div className='absolute bottom-2 left-2'>
                                                <Button href='#' className='font-sans' color='danger' variant='text'>
                                                    ĐỌC TRUYỆN
                                                </Button>
                                            </div>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default CardItem