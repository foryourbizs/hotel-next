import Link from "next/link";
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#f7f7f7] border-t border-[#ebebeb]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-12">
        {/* Company Info */}
        <div className="mb-8">
          <Image
            src="/images/footer/logo-black.svg"
            alt="ServiceName"
            width={120}
            height={28}
            className="h-[28px] mb-4"
          />
          <p className="text-[13px] text-[#919191] leading-[1.5] mb-4">
            사업자등록번호 : 101-81-71706 | 대표 : 김병지 | 통신판매업신고 :
            제2018-서울서초-0048호
            <br />
            주소 : 서울시 서초구 강남대로 373 띴지스빌딩 12층
            <br />
            이메일 : bigdata@busanit.ac.kr 전화번호 : 1588-8842
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-[14px] font-bold text-[#333] mb-3">회사소개</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#919191] hover:text-[#333]"
                >
                  회사소개
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#919191] hover:text-[#333]"
                >
                  공지사항
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#919191] hover:text-[#333]"
                >
                  인재채용
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#919191] hover:text-[#333]"
                >
                  신규파트너
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#333] mb-3">이용약관</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#919191] hover:text-[#333]"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#919191] hover:text-[#333]"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#919191] hover:text-[#333]"
                >
                  청소년보호정책
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#333] mb-3">고객센터</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#919191] hover:text-[#333]"
                >
                  고객센터
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#919191] hover:text-[#333]"
                >
                  자주묻는질문
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#919191] hover:text-[#333]"
                >
                  예약대행서비스
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#333] mb-3">
              사업자정보
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#919191] hover:text-[#333]"
                >
                  예약시스템
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#919191] hover:text-[#333]"
                >
                  사업자등록
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#919191] hover:text-[#333]"
                >
                  마켓팅제휴
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Awards & Certifications */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Image
            src="/images/footer/cert-isms.svg"
            alt="ISMS"
            width={80}
            height={60}
            className="h-[60px]"
          />
          <Image
            src="/images/footer/cert-privacy.svg"
            alt="ePrivacy"
            width={80}
            height={60}
            className="h-[60px]"
          />
          <Image
            src="/images/footer/cert-kftc.svg"
            alt="KFTC"
            width={80}
            height={60}
            className="h-[60px]"
          />
        </div>

        {/* Social Media */}
        <div className="flex gap-3">
          <Link href="#" className="hover:opacity-70">
            <Image
              src="/images/footer/social-instagram.svg"
              alt="Instagram"
              width={32}
              height={32}
              className="w-[32px] h-[32px]"
            />
          </Link>
          <Link href="#" className="hover:opacity-70">
            <Image
              src="/images/footer/social-blog.svg"
              alt="Blog"
              width={32}
              height={32}
              className="w-[32px] h-[32px]"
            />
          </Link>
          <Link href="#" className="hover:opacity-70">
            <Image
              src="/images/footer/social-facebook.svg"
              alt="Facebook"
              width={32}
              height={32}
              className="w-[32px] h-[32px]"
            />
          </Link>
          <Link href="#" className="hover:opacity-70">
            <Image
              src="/images/footer/social-youtube.svg"
              alt="YouTube"
              width={32}
              height={32}
              className="w-[32px] h-[32px]"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
