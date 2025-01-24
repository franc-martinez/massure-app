import { Link } from "react-router-dom";

//component

interface AccountLayoutProps {
  pageImage?: any;
  authTitle?: string;
  helpText?: string;
  bottomLinks?: any;
  isCombineForm?: boolean;
  children?: any;
  hasForm?: boolean;
  hasThirdPartyLogin?: boolean;
  userImage?: string;
}

const AuthLayout = ({
  pageImage,
  authTitle,
  helpText,
  bottomLinks,
  isCombineForm,
  children,
  hasForm,
  hasThirdPartyLogin,
  userImage,
}: AccountLayoutProps) => {

  return (
    <>
      <div className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-700 dark:via-gray-900 dark:to-black">
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="2xl:w-1/4 lg:w-1/3 md:w-1/2 w-full">
            <div className="card overflow-hidden sm:rounded-md rounded-none">
              <div className="p-6">
                

                {children}

                <div className="flex items-center my-6">
                  <div className="flex-auto mt-px border-t border-dashed border-gray-200 dark:border-slate-700"></div>
                  <div className="mx-4 text-secondary">Or</div>
                  <div className="flex-auto mt-px border-t border-dashed border-gray-200 dark:border-slate-700"></div>
                </div>

                {hasThirdPartyLogin &&
                  <div className="flex gap-4 justify-center mb-6">
                    <Link to="https://github.com/" target="_blank" className="btn border-light text-gray-400 dark:border-slate-700">
                      <span className="flex justify-center items-center gap-2">
                        <i className="mgc_github_line text-info text-xl"></i>
                        <span className="lg:block hidden">Github</span>
                      </span>
                    </Link>
                    <Link to="https://www.google.com/" className="btn border-light text-gray-400 dark:border-slate-700">
                      <span className="flex justify-center items-center gap-2">
                        <i className="mgc_google_line text-danger text-xl"></i>
                        <span className="lg:block hidden">Google</span>
                      </span>
                    </Link>
                    <Link to="https://www.facebook.com/" className="btn border-light text-gray-400 dark:border-slate-700">
                      <span className="flex justify-center items-center gap-2">
                        <i className="mgc_facebook_line text-primary text-xl"></i>
                        <span className="lg:block hidden">Facebook</span>
                      </span>
                    </Link>
                  </div>
                }

                {bottomLinks}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AuthLayout;
