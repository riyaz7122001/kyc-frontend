import { AiOutlineSearch } from "react-icons/ai";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import '../../../css/customsearch.css';

type CustomSearchProps = {
    placeholder: string;
    onInput: (value: string) => void;
};

export default function CustomSearch({ placeholder, onInput }: CustomSearchProps) {
    return (
        <InputGroup>
            <InputGroupText className='search-input-group-text'>
                <AiOutlineSearch className='search-icon' />
            </InputGroupText>
            <Input onChange={e => onInput(e.target.value)} placeholder={placeholder} className='search-input' />
        </InputGroup>
    )
}
