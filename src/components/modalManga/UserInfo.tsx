import { Modal } from 'antd'

interface ModelInfoProps {
    isOpenUserInfo: boolean;
    handleOk: () => void;
    handleCancel: () => void;

}
const UserInfo = (props: ModelInfoProps) => {
    const { isOpenUserInfo, handleOk, handleCancel } = props;
    return (
        <>
            <Modal style={{ top: 68 }} title="Basic Modal" open={isOpenUserInfo} onOk={handleOk} onCancel={handleCancel}>
                <p>User Info</p>
            </Modal>
        </>
    )
}

export default UserInfo