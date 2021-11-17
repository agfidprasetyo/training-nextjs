import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    imageContainer: {
        aspectRatio: 1
    },
    cardContainer: {
        margin: 10,
        flexDirection: "row",
        width: 345,
        height: 245
    }
}));

export default useStyles;