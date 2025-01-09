import { Text } from "react-native";

export const FormError = ({ error, touched, name }) => {
  return touched?.[name] && error?.[name] ? (
    <Text style={{ color: "red" }}>{error?.[name]}</Text>
  ) : null;
};
