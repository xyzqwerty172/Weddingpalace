import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material";

import FormProvider, {
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";

import { FormSchema } from "./schema";
import ValuesPreview from "./values-preview";

// ----------------------------------------------------------------------

const OPTIONS = [
  { value: "option 1", label: "Үйлчилгээ" },
  { value: "option 2", label: "Түрээс" },
  { value: "option 3", label: "Фото, видео" },
  { value: "option 4", label: "Чимэглэл" },
];

export const defaultValues = {
  age: 0,
  email: "",
  fullName: "",
  //
  editor: "",
  switch: false,
  radioGroup: "",
  autocomplete: null,
  //
  password: "",
  confirmPassword: "",
  //
  startDate: null,
  endDate: null,
  //
  singleUpload: null,
  multiUpload: [],
  //
  singleSelect: "",
  multiSelect: [],
  //
  singleCountry: "",
  multiCountry: [],
  //
  checkbox: false,
  multiCheckbox: [],
  //
  slider: 8,
  sliderRange: [15, 80],
};

export default function ReactHookForm({ debug }) {
  const theme = useTheme();
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      {isSubmitting && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box
        // gap={5}
        // display="grid"
        // gridTemplateColumns={{
        //   xs: "repeat(1, 1fr)",
        //   sm: "repeat(2, 1fr)",
        // }}
        >
          <Stack
            spacing={2}
            sx={{
              padding: 2,
              borderRadius: 1,
            }}
          >
            <Block>
              <RHFTextField
                name="fullName"
                label="Овог нэр"
                sx={{ bgcolor: theme.palette.grey[0], borderRadius: 1 }}
              />
            </Block>

            <Block>
              <RHFTextField
                name="phoneNumber"
                label="Утасны дугаар"
                type={"number"}
                sx={{ bgcolor: theme.palette.grey[0], borderRadius: 1 }}
              />
            </Block>

            <Block>
              <RHFSelect
                name="singleSelect"
                label="Үйлчилгээгээ сонгоно уу"
                sx={{ bgcolor: theme.palette.grey[0], borderRadius: 1 }}
              >
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: "dashed" }} />
                {OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Block>

            <Block>
              <RHFTextField
                name="extra"
                label="Та хүсэлтээ бичнэ үү"
                sx={{ bgcolor: theme.palette.grey[0], borderRadius: 1 }}
              />
            </Block>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="soft"
              loading={isSubmitting}
              sx={{ bgcolor: theme.palette.grey[0], borderRadius: 1 }}
            >
              ХҮСЭЛТ ИЛГЭЭХ
            </LoadingButton>
          </Stack>
        </Box>

        {debug && <ValuesPreview />}
      </FormProvider>
    </>
  );
}

ReactHookForm.propTypes = {
  debug: PropTypes.bool,
};

// ----------------------------------------------------------------------

function Block({ label = "", sx, children }) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: "right",
          fontStyle: "italic",
          color: "text.disabled",
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  sx: PropTypes.object,
};
