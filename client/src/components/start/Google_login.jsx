import { useSearchParams } from 'react-router-dom';
const Google_Login = () => {
  const [params, setParams] = useSearchParams();
  const code = params.get('code');
  // params.get('code')에 담겨있고
  // 이걸 백으로 보내서 isSignUp 여부로
  // 페이지 이동 -> Home 또는 프로필 편집

  return <h2>code 가져오기</h2>;
};

export default Google_Login;
