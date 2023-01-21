export default function Dropdown(props) {
    return (
    <select onChange={(event) => {props.handleChange(event.target.value)}} className="product-dropdown">
        <option value="All">All</option>
        <option value='Flash Sale'>Flash Sale</option>
        <option value='Kitchen'>Kitchen</option>
        <option value='Electronics'>Electronics</option>
        <option value='Furniture'>Furniture</option>
    </select>
    )
}