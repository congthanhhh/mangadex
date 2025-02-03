import { Button } from "antd";
import { useState } from "react";


interface ShowMoreLessProps<T> {
    data: T[];
    renderItem: (item: T, index: number) => JSX.Element;
    initialVisible: number;
    incremental?: boolean;
    step?: number;
    className?: string;
    buttonClassName?: string;
}
const ShowMoreLess = <T,>(props: ShowMoreLessProps<T>) => {

    const { data, renderItem, initialVisible, incremental = false, step = 10, className = "", buttonClassName = "" } = props;

    const [visible, setVisible] = useState(initialVisible);
    const [isExpanded, setIsExpanded] = useState(false);

    const showMoreLess = () => {
        if (!isExpanded) {
            if (incremental) {
                setVisible((prev) => Math.min(prev + step, data.length));

                if (visible + step >= data.length) {
                    setIsExpanded(true);
                }
            } else {
                setVisible(data.length);
                setIsExpanded(true);
            }
        } else {
            setVisible(initialVisible);
            setIsExpanded(false);
        }

    }
    return (
        <>
            {data.slice(0, visible).map((item, index) => renderItem(item, index))}

            {data.length > initialVisible && (
                <div className={className}>
                    <Button color="default" variant="dashed"
                        onClick={() => showMoreLess()}
                        // className="w-full h-11 rounded-md text-sm px-4 border-2">
                        className={buttonClassName}>
                        {isExpanded ? "THU GỌN" : "XEM THÊM"}
                    </Button>
                </div>
            )}
        </>
    )
};


export default ShowMoreLess