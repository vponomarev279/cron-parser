import { convertCron } from "./service/converter.service";

try {
  console.log(convertCron(process.argv[2]));
} catch (error) {
  console.error(error.message);
}
