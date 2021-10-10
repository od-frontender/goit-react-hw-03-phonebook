import PropTypes from "prop-types";
import s from "./Filter.module.css";

const Filter = ({ filter, onChangeFilter }) => {
  return (
    <label className={s.label}>
      Find contacts by name
      <input
        className={s.input}
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Введите имя контакта. Поиск не чувствительный к регистру вводимых символов."
        required
        onChange={onChangeFilter}
        value={filter}
      ></input>
    </label>
  );
};
Filter.protoType = {
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func,
};

export default Filter;
