import { useSearchParams } from 'react-router-dom';
const Google_Login = () => {
  const [params, setParams] = useSearchParams();
  console.log(params.get('code'));

  return <h2>code 가져오기</h2>;
};

export default Google_Login;
