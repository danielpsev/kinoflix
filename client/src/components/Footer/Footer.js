import LitukasLogo from '../../assets/images/litukas.png';

const Footer = () => {
    return (
        <footer className="footer">
        <div className="wrapper">
          <div className="footer-inner">
                  <div className="creator">Creator copyright<br/> 
                  {/* <a href="#"><img style={{marginTop: 15, objectFit: "cover"}} className="grey-filter" width="120px" src={LitukasLogo} alt="Litukas"/></a> */}
                  </div>
                  <div className="soc-media">
                    <a href="#"><svg  width="24" height="24" viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"> <g><path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="#5865F2"></path></g></svg></a>


                    <a href="#"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.46471 1.0662C8.63794 1.01266 9.01258 1 12 1C14.9874 1 15.362 1.01266 16.5352 1.0662C17.7061 1.1196 18.5057 1.30556 19.2054 1.57751C19.9288 1.85858 20.5422 2.2347 21.1537 2.84623C21.7653 3.45779 22.1414 4.07123 22.4225 4.79454C22.6944 5.49426 22.8804 6.29385 22.9338 7.46471C22.9873 8.63798 23 9.01258 23 12C23 14.9874 22.9873 15.362 22.9338 16.5353C22.8804 17.7061 22.6944 18.5057 22.4225 19.2054C22.1414 19.9288 21.7653 20.5422 21.1537 21.1537C20.5422 21.7653 19.9288 22.1414 19.2054 22.4225C18.5057 22.6944 17.7061 22.8804 16.5352 22.9338C15.362 22.9873 14.9874 23 12 23C9.01258 23 8.63794 22.9873 7.46471 22.9338C6.29385 22.8804 5.49426 22.6944 4.79454 22.4225C4.07123 22.1414 3.45775 21.7653 2.84623 21.1537C2.23466 20.5422 1.85858 19.9287 1.57746 19.2054C1.30552 18.5057 1.1196 17.7061 1.06615 16.5353C1.01262 15.362 1 14.9874 1 12C1 9.01254 1.01262 8.63798 1.06615 7.46471C1.1196 6.29385 1.30552 5.49426 1.57746 4.79454C1.85858 4.07123 2.23466 3.45779 2.84623 2.84623C3.45775 2.2347 4.07123 1.85858 4.79454 1.57751C5.49426 1.30556 6.29385 1.1196 7.46471 1.0662ZM16.4449 3.04608C15.285 2.99316 14.9371 2.98198 12 2.98198C9.06284 2.98198 8.71496 2.99316 7.55501 3.04608C6.48257 3.09503 5.90008 3.27423 5.51247 3.42487C4.99906 3.62442 4.63259 3.86278 4.24768 4.24773C3.86278 4.63263 3.62437 4.99906 3.42482 5.51252C3.27423 5.90013 3.09503 6.48257 3.04608 7.55506C2.99316 8.71496 2.98198 9.06288 2.98198 12C2.98198 14.9371 2.99316 15.285 3.04608 16.4449C3.09503 17.5174 3.27423 18.0999 3.42482 18.4875C3.62437 19.0009 3.86278 19.3674 4.24768 19.7523C4.63259 20.1372 4.99906 20.3756 5.51247 20.5751C5.90008 20.7257 6.48257 20.905 7.55506 20.9539C8.71479 21.0068 9.06262 21.018 12 21.018C14.9373 21.018 15.2852 21.0068 16.4449 20.9539C17.5174 20.905 18.0998 20.7257 18.4874 20.5751C19.0009 20.3756 19.3674 20.1372 19.7523 19.7523C20.1372 19.3674 20.3755 19.0009 20.5751 18.4875C20.7257 18.0999 20.9049 17.5174 20.9539 16.4449C21.0068 15.285 21.018 14.9371 21.018 12C21.018 9.06288 21.0068 8.71496 20.9539 7.55506C20.9049 6.48257 20.7257 5.90013 20.5751 5.51252C20.3755 4.99906 20.1372 4.63263 19.7523 4.24768C19.3674 3.86278 19.0009 3.62442 18.4874 3.42487C18.0998 3.27423 17.5174 3.09503 16.4449 3.04608ZM8.33329 12C8.33329 14.025 9.97495 15.6667 12 15.6667C14.025 15.6667 15.6667 14.025 15.6667 12C15.6667 9.97495 14.025 8.33333 12 8.33333C9.97495 8.33333 8.33329 9.97495 8.33329 12ZM6.35131 12C6.35131 8.88032 8.88032 6.35136 12 6.35136C15.1196 6.35136 17.6486 8.88032 17.6486 12C17.6486 15.1197 15.1196 17.6486 12 17.6486C8.88032 17.6486 6.35131 15.1197 6.35131 12ZM17.8718 7.44816C18.6008 7.44816 19.1918 6.8572 19.1918 6.12818C19.1918 5.39915 18.6008 4.8082 17.8718 4.8082C17.1428 4.8082 16.5518 5.39915 16.5518 6.12818C16.5518 6.8572 17.1428 7.44816 17.8718 7.44816Z" fill="#3F3F46"/>
                        <mask id="mask0_2844_2717" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="1" y="1" width="22" height="22">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.46471 1.0662C8.63794 1.01266 9.01258 1 12 1C14.9874 1 15.362 1.01266 16.5352 1.0662C17.7061 1.1196 18.5057 1.30556 19.2054 1.57751C19.9288 1.85858 20.5422 2.2347 21.1537 2.84623C21.7653 3.45779 22.1414 4.07123 22.4225 4.79454C22.6944 5.49426 22.8804 6.29385 22.9338 7.46471C22.9873 8.63798 23 9.01258 23 12C23 14.9874 22.9873 15.362 22.9338 16.5353C22.8804 17.7061 22.6944 18.5057 22.4225 19.2054C22.1414 19.9288 21.7653 20.5422 21.1537 21.1537C20.5422 21.7653 19.9288 22.1414 19.2054 22.4225C18.5057 22.6944 17.7061 22.8804 16.5352 22.9338C15.362 22.9873 14.9874 23 12 23C9.01258 23 8.63794 22.9873 7.46471 22.9338C6.29385 22.8804 5.49426 22.6944 4.79454 22.4225C4.07123 22.1414 3.45775 21.7653 2.84623 21.1537C2.23466 20.5422 1.85858 19.9287 1.57746 19.2054C1.30552 18.5057 1.1196 17.7061 1.06615 16.5353C1.01262 15.362 1 14.9874 1 12C1 9.01254 1.01262 8.63798 1.06615 7.46471C1.1196 6.29385 1.30552 5.49426 1.57746 4.79454C1.85858 4.07123 2.23466 3.45779 2.84623 2.84623C3.45775 2.2347 4.07123 1.85858 4.79454 1.57751C5.49426 1.30556 6.29385 1.1196 7.46471 1.0662ZM16.4449 3.04608C15.285 2.99316 14.9371 2.98198 12 2.98198C9.06284 2.98198 8.71496 2.99316 7.55501 3.04608C6.48257 3.09503 5.90008 3.27423 5.51247 3.42487C4.99906 3.62442 4.63259 3.86278 4.24768 4.24773C3.86278 4.63263 3.62437 4.99906 3.42482 5.51252C3.27423 5.90013 3.09503 6.48257 3.04608 7.55506C2.99316 8.71496 2.98198 9.06288 2.98198 12C2.98198 14.9371 2.99316 15.285 3.04608 16.4449C3.09503 17.5174 3.27423 18.0999 3.42482 18.4875C3.62437 19.0009 3.86278 19.3674 4.24768 19.7523C4.63259 20.1372 4.99906 20.3756 5.51247 20.5751C5.90008 20.7257 6.48257 20.905 7.55506 20.9539C8.71479 21.0068 9.06262 21.018 12 21.018C14.9373 21.018 15.2852 21.0068 16.4449 20.9539C17.5174 20.905 18.0998 20.7257 18.4874 20.5751C19.0009 20.3756 19.3674 20.1372 19.7523 19.7523C20.1372 19.3674 20.3755 19.0009 20.5751 18.4875C20.7257 18.0999 20.9049 17.5174 20.9539 16.4449C21.0068 15.285 21.018 14.9371 21.018 12C21.018 9.06288 21.0068 8.71496 20.9539 7.55506C20.9049 6.48257 20.7257 5.90013 20.5751 5.51252C20.3755 4.99906 20.1372 4.63263 19.7523 4.24768C19.3674 3.86278 19.0009 3.62442 18.4874 3.42487C18.0998 3.27423 17.5174 3.09503 16.4449 3.04608ZM8.33329 12C8.33329 14.025 9.97495 15.6667 12 15.6667C14.025 15.6667 15.6667 14.025 15.6667 12C15.6667 9.97495 14.025 8.33333 12 8.33333C9.97495 8.33333 8.33329 9.97495 8.33329 12ZM6.35131 12C6.35131 8.88032 8.88032 6.35136 12 6.35136C15.1196 6.35136 17.6486 8.88032 17.6486 12C17.6486 15.1197 15.1196 17.6486 12 17.6486C8.88032 17.6486 6.35131 15.1197 6.35131 12ZM17.8718 7.44816C18.6008 7.44816 19.1918 6.8572 19.1918 6.12818C19.1918 5.39915 18.6008 4.8082 17.8718 4.8082C17.1428 4.8082 16.5518 5.39915 16.5518 6.12818C16.5518 6.8572 17.1428 7.44816 17.8718 7.44816Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask0_2844_2717)">
                        </g>
                    </svg></a>


                    <a href="#"><svg width="24px" height="24px" viewBox="0 0 24 24" id="meteor-icon-kit__regular-facebook" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.38823 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9165 4.6875 14.6576 4.6875C15.9705 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.3399 7.875 13.875 8.80001 13.875 9.74899V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="#758CA3"/></svg></a>

                    <a href="#"><svg width="24px" height="24px" viewBox="0 -2 24 24" id="meteor-icon-kit__regular-twitter" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.54752 20C16.6042 20 21.5578 12.3048 21.5578 5.63156C21.5578 5.41299 21.5578 5.19541 21.5434 4.97881C22.507 4.26394 23.3389 3.37881 24 2.36484C23.1013 2.77324 22.148 3.04106 21.1718 3.15937C22.1998 2.52826 22.9691 1.53563 23.3366 0.36622C22.3701 0.95444 21.3126 1.36899 20.2099 1.59198C18.6836 -0.0725 16.2583 -0.47988 14.294 0.59826C12.3296 1.6764 11.3148 3.97194 11.8186 6.19768C7.85942 5.99412 4.1707 4.0763 1.6704 0.9215C0.363478 3.22892 1.03103 6.1808 3.19488 7.66268C2.41127 7.63886 1.64475 7.42207 0.96 7.0306C0.96 7.05128 0.96 7.07294 0.96 7.09459C0.960641 9.4985 2.61288 11.5689 4.9104 12.0449C4.18547 12.2476 3.42488 12.2773 2.68704 12.1315C3.33211 14.1887 5.18071 15.5979 7.28736 15.6385C5.54375 17.0438 3.38982 17.8068 1.17216 17.8045C0.780387 17.8037 0.388996 17.7794 0 17.7316C2.25181 19.2136 4.87192 19.9997 7.54752 19.9961" fill="#758CA3"/></svg></a>

                </div>
                <div className="copyright"><p>&copy; 2023 KinoFlix</p>        <a target="_blank" href="http://www.hey.lt/details.php?id=kinoflix"><img style={{marginTop: 25}} width="88" height="31" src="http://www.hey.lt/count.php?id=dcserveriai" alt="Hey.lt - Nemokamas lankytojų skaitliukas" /></a></div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;