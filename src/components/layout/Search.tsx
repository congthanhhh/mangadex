import { useState } from 'react'

const Search = () => {
    const [value, setValue] = useState<string>('');
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };
    const onChange = (e: any) => {
        setValue(e.target.value);
    }
    const onSearch = (searchItem: string) => {
        setValue(searchItem);
        console.log('>>>> search ', searchItem)
    }
    return (
        <>
            <Form>
                <Row>
                    <Col xs="auto">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className={`mr-sm-2 w-20 transition duration-300 ease-in-out ${isClicked ? 'w-full' : ''}`}
                            value={value}
                            onChange={onChange}
                            onClick={() => handleClick()}
                            onKeyDown={(even) => {
                                if (even.key === "Enter") {
                                    onSearch(value)
                                }
                            }}
                        />
                    </Col>
                </Row>
                {/* <Card style={{ width: 'auto' }}>

                    <ListGroup variant="flush">
                        {data.filter(item => {
                            const searchItem = value.toLowerCase();
                            const fullname = item.full_name.toLowerCase();
                            return (searchItem && fullname.startsWith(searchItem)
                                && fullname !== searchItem
                            );
                        })
                            .map((item) =>
                                <ListGroup.Item onClick={() => onSearch(item.full_name)} key={item.id} className='cursor-pointer'>
                                    {item.full_name}
                                </ListGroup.Item>)}
                    </ListGroup>
                </Card> */}
            </Form>
            {/* <div>
                <div >
                    <input className='bg-slate-400' type="text" value={value} onChange={onChange} />
                    <Button onClick={() => onSearch(value)}>Search</Button>
                </div>
                <div className='flex flex-col'>
                    {data.filter(item => {
                        const searchItem = value.toLowerCase();
                        const fullname = item.full_name.toLowerCase();
                        return (searchItem && fullname.startsWith(searchItem)
                            && fullname !== searchItem
                        );
                    }).slice(0, 10) // so luong item muon hien thi
                        .map((item) =>
                            <div onClick={() => onSearch(item.full_name)} key={item.id} className='cursor-pointer my-1'>
                                {item.full_name}
                            </div>)}
                </div>
            </div> */}
        </>
    )
}

export default Search