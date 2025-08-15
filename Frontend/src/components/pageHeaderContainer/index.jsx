import './styles.scss'

const PageHeaderContent = (props)=>{
    const {headerText, Icon} = props;

    return(
        <div className="wrapper">
            <h2>{headerText}</h2>
            <span>{Icon}</span>
        </div>
    )
}

export default PageHeaderContent