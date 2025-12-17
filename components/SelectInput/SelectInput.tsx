import Select, { SingleValue } from "react-select";

interface OptionType {
  value: string | null;
  label: string;
}

export interface SelectInputProps {
  options: OptionType[];
  onChange: (option: SingleValue<OptionType>) => void;
  value: OptionType;
  instanceId?: string;
}

const SelectInput = ({
  options,
  onChange,
  value,
  instanceId,
}: SelectInputProps) => {
  return (
    <Select<OptionType>
      options={options}
      components={{ IndicatorSeparator: () => null }}
      isSearchable={false}
      defaultValue={options[0]}
      value={value}
      instanceId={instanceId}
      onChange={(option: SingleValue<OptionType>) => {
        onChange(option);
      }}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#f7f7fb",
          border: "none",
          boxShadow: "none",
          borderRadius: "14px",
          padding: "10px 14px",
          minHeight: "48px",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#f0f0f4",
          },
        }),

        valueContainer: (base) => ({
          ...base,
          padding: 0,
          color: "var(--text)",
          fontSize: "16px",
          fontWeight: 500,
        }),

        input: (base) => ({
          ...base,
          margin: 0,
          padding: 0,
          color: "var(--text)",
        }),

        singleValue: (base) => ({
          ...base,
          color: "#121417",
          fontWeight: 500,
          fontSize: "18px",
        }),

        placeholder: (base) => ({
          ...base,
          color: "#121417",
          fontWeight: 500,
          fontSize: "18px",
        }),

        dropdownIndicator: (base, state) => ({
          ...base,
          padding: "0 4px",
          color: "#121417",
          transition: "transform 0.3s ease",
          transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "none",
        }),

        indicatorsContainer: (base) => ({
          ...base,
          padding: 0,
        }),

        menu: (base) => ({
          ...base,
          backgroundColor: "#ffffff",
          border: "1px solid #f0f0f4",
          borderRadius: "14px",
          marginTop: "4px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }),

        menuList: (base) => ({
          ...base,
          padding: "4px",
        }),

        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? "#3470ff"
            : state.isFocused
              ? "#f0f0f4"
              : "transparent",
          color: state.isSelected ? "#ffffff" : "#121417",
          padding: "10px 14px",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }),
      }}
    />
  );
};

export default SelectInput;
