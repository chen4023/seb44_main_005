// import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  CardContainer,
  CardText,
  CardPrice,
  Text,
} from '../../styles/Categorybar/CategoryCard';
import { BsFillStarFill } from 'react-icons/bs';
import { PiHeartFill } from 'react-icons/pi';
import { PiHeart } from 'react-icons/pi';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoginState } from '../../store/userInfoAtom';
import { Heart } from '../../store/categoryAtom';

type CProps = {
  data: {
    storeId: number;
    category: string;
    title: string;
    content: string;
    address: string;
    rating: number;
    reviewCount: string;
    price: number;
    isLike: boolean;
    img: string;
  };
};
function CategoryCard({ data }: CProps) {
  const { storeId, img, title, reviewCount, address, rating, price, isLike } =
    data;
  const url = import.meta.env.VITE_APP_API_URL;
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isHeart, setIsHeart] = useRecoilState(Heart);
  const isLogin = useRecoilValue(isLoginState);
  // 타이머 변수
  let clickTimer;
  // console.log(clickTimer);

  // 상태코드 보고 UI 변경시키기 ..
  const onClickHeart = async () => {
    if (!isLogin) {
      alert(`로그인 상태에서만 등록할 수 있습니다.`);
    }
    if (!isHeartClicked) {
      setIsHeartClicked(true);
      const res = await fetch(`${url}/stores/favorites/${storeId}`, {
        method: 'POST',
        headers: { Authorization: sessionStorage.getItem('Authorization') },
      });
      if (res.status === 201) {
        setIsHeart(true);
        console.log(isLike);
      }
      // console.log(isLike);

      clickTimer = setTimeout(() => {
        setIsHeartClicked(false);
      }, 5000);
    }
  };

  const onClickNonHeart = async () => {
    if (!isLogin) {
      alert(`로그인 상태에서만 등록할 수 있습니다.`);
    }
    if (!isHeartClicked) {
      setIsHeartClicked(true);

      const res = await fetch(`${url}/stores/favorites/${storeId}`, {
        method: 'DELETE',
        headers: { Authorization: sessionStorage.getItem('Authorization') },
      });
      // console.log(isLike);
      if (res.status === 201) {
        setIsHeart(false);
      }
      console.log(isLike);
      clickTimer = setTimeout(() => {
        setIsHeartClicked(false);
      }, 5000);
    }
  };
  // console.log(isLike);
  return (
    <CardContainer>
      <img className="w-[250px] h-[198px] object-cover" src={img} />
      <CardText>
        <Link to={`/category/${storeId}`} className="font-semibold">
          {title}
        </Link>
        <Text>
          <span className="w-[20px] mr-[5px] mt-[2px]">
            <BsFillStarFill size="18" color="#4771B7" />
          </span>
          <span className="mr-[2px]">{rating}</span>
          <span className="mr-[12px]">({reviewCount})</span>
          <span>{address}</span>
        </Text>
        <CardPrice>
          <span>{price.toLocaleString('ko-KR')}원 ~</span>
          {isHeart ? (
            <PiHeartFill
              className="cursor-pointer"
              onClick={onClickNonHeart}
              size="24"
              color="#4771B7"
            />
          ) : (
            <PiHeart
              className="cursor-pointer"
              onClick={onClickHeart}
              size="24"
              color="#4771B7"
            />
          )}
        </CardPrice>
      </CardText>
    </CardContainer>
  );
}

export default CategoryCard;
