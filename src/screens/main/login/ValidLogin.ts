import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
export const valid = yup.object().shape({
    username: yup.string().required('Số điện thoại không được để trống'),
  });
