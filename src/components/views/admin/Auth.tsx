import Link from "next/link";
import React from "react";

const Auth = () => {
  return (
    <div className="new-loader-wrapper-admin">
      <div className="modal--auto">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal__content">
            <h4 className="modal__title">Notic</h4>
            <p className="modal__text">
              Sorry you are <span>not authorized to </span> access the admin panel
            </p>
            <div className="modal__form">
              <Link href="/home" className="form__btn" type="button"> Go Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Auth;