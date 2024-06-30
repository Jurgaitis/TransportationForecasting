import { useState } from "react";

export default function Logo({ size=1, primaryColor="lightGray", secondaryColor="gray" }) {
	const [fill, setFill] = useState(primaryColor);

	return (
		<svg width={29 * size} height={14 * size} 
			onMouseEnter={() => setFill(secondaryColor)} onMouseLeave={() => setFill(primaryColor)} 
			viewBox="0 0 29 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="LogoBase">
				<path id="Exclude" fillRule="evenodd" clipRule="evenodd" fill={fill}
					d="M2.05025 11.9497C-0.683417 9.21608 -0.683417 4.78392 2.05025 2.05025C4.78392 -0.683418 9.21608 -0.683417 11.9497 2.05025L15.4853 5.58579L19.0208 9.12132C20.1924 10.2929 22.0919 10.2929 23.2635 9.12132C24.435 7.94975 24.435 6.05025 23.2635 4.87868C22.0919 3.70711 20.1924 3.70711 19.0208 4.87868L18.1369 5.76256L17.695 6.2045L14.8666 3.37608L15.3085 2.93414L16.1924 2.05025C18.9261 -0.683418 23.3582 -0.683418 26.0919 2.05025C28.8256 4.78392 28.8256 9.21608 26.0919 11.9497C23.3582 14.6834 18.9261 14.6834 16.1924 11.9497L12.6569 8.41421L9.12132 4.87868C7.94975 3.70711 6.05025 3.70711 4.87868 4.87868C3.70711 6.05025 3.70711 7.94975 4.87868 9.12132C6.05025 10.2929 7.94975 10.2929 9.12132 9.12132L10.0052 8.23744L10.4471 7.7955L13.2756 10.6239L12.8336 11.0659L11.9497 11.9497C9.21608 14.6834 4.78392 14.6834 2.05025 11.9497ZM3.81802 3.81802C3.60506 4.03098 3.41819 4.25959 3.25721 4.49998L2.42631 3.94355C2.62336 3.64931 2.85163 3.37019 3.11091 3.11091C3.37019 2.85163 3.64931 2.62336 3.94355 2.42631L4.49998 3.25721C4.25959 3.41819 4.03098 3.60506 3.81802 3.81802ZM2.58605 6.12147C2.47132 6.70104 2.47132 7.29896 2.58605 7.87853L1.60509 8.07273C1.46497 7.36494 1.46497 6.63506 1.60509 5.92727L2.58605 6.12147ZM7.87853 2.58605C7.29896 2.47132 6.70104 2.47132 6.12147 2.58605L5.92727 1.60509C6.63506 1.46497 7.36494 1.46497 8.07273 1.60509L7.87853 2.58605ZM3.25721 9.50002C3.41819 9.74041 3.60506 9.96902 3.81802 10.182C4.03098 10.3949 4.25959 10.5818 4.49998 10.7428L3.94355 11.5737C3.64931 11.3766 3.37019 11.1484 3.11091 10.8891C2.85163 10.6298 2.62336 10.3507 2.42631 10.0565L3.25721 9.50002ZM10.182 3.81802C9.96902 3.60506 9.74041 3.41819 9.50002 3.25721L10.0565 2.42631C10.3507 2.62336 10.6298 2.85163 10.8891 3.11091L11.773 3.9948L11.0659 4.7019L10.182 3.81802ZM6.12147 11.4139C6.70104 11.5287 7.29896 11.5287 7.87853 11.4139L8.07273 12.3949C7.36494 12.535 6.63506 12.535 5.92727 12.3949L6.12147 11.4139ZM13.7175 7.35355L12.8336 6.46967L13.5407 5.76256L14.4246 6.64645L15.3085 7.53033L14.6014 8.23744L13.7175 7.35355ZM9.50002 10.7428C9.74041 10.5818 9.96902 10.3949 10.182 10.182L10.5134 9.85052L11.2205 10.5576L10.8891 10.8891C10.6298 11.1484 10.3507 11.3766 10.0565 11.5737L9.50002 10.7428ZM11.1763 9.18761L11.5078 8.85616L12.2149 9.56326L11.8835 9.89472L11.1763 9.18761ZM15.9272 4.43674L16.2587 4.10528L16.9658 4.81239L16.6343 5.14384L15.9272 4.43674ZM16.9216 3.44237L17.253 3.11091C17.5123 2.85163 17.7914 2.62336 18.0857 2.42632L18.6421 3.2572C18.4017 3.41819 18.1731 3.60506 17.9602 3.81802L17.6287 4.14948L16.9216 3.44237ZM20.0694 1.60509C20.7772 1.46497 21.5071 1.46497 22.2149 1.60509L22.0207 2.58606C21.4411 2.47132 20.8432 2.47132 20.2636 2.58606L20.0694 1.60509ZM17.253 10.8891L16.3692 10.0052L17.0763 9.2981L17.9602 10.182C18.1731 10.3949 18.4017 10.5818 18.6421 10.7428L18.0857 11.5737C17.7914 11.3766 17.5123 11.1484 17.253 10.8891ZM24.1986 2.42632C24.4928 2.62336 24.7719 2.85163 25.0312 3.11091C25.2905 3.37019 25.5188 3.64931 25.7158 3.94355L24.8849 4.49998C24.7239 4.25959 24.5371 4.03098 24.3241 3.81802C24.1112 3.60506 23.8825 3.41819 23.6422 3.25721L24.1986 2.42632ZM22.2149 12.3949C21.5071 12.535 20.7772 12.535 20.0694 12.3949L20.2636 11.4139C20.8432 11.5287 21.4411 11.5287 22.0207 11.4139L22.2149 12.3949ZM26.537 5.92727C26.6772 6.63506 26.6772 7.36494 26.537 8.07273L25.5561 7.87853C25.6708 7.29896 25.6708 6.70104 25.5561 6.12147L26.537 5.92727ZM25.0312 10.8891C24.7719 11.1484 24.4928 11.3766 24.1986 11.5737L23.6422 10.7428C23.8825 10.5818 24.1112 10.3949 24.3241 10.182C24.5371 9.96902 24.7239 9.74041 24.8849 9.50002L25.7158 10.0565C25.5188 10.3507 25.2905 10.6298 25.0312 10.8891Z" />
			</g>
		</svg>
	);
}