import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
export const valid = yup.object().shape({
    task: yup.string().required('Không để trống công việc'),
  });