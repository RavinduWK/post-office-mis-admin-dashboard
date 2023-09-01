import React from "react";
import { BellWrapper } from "./BellWrapper";
import { Button } from "./Button";
import { CaretDownWrapper } from "./CaretDownWrapper";
import { CubeWrapper } from "./CubeWrapper";
import { Gear } from "./Gear";
import { MaterialSymbolsLightModeOutline } from "./MaterialSymbolsLightModeOutline";
import { MaterialSymbolsMenuRounded } from "./MaterialSymbolsMenuRounded";
import { MdiAccountPaymentOutline } from "./MdiAccountPaymentOutline";
import { MdiCourierFast } from "./MdiCourierFast";
import { Select } from "./Select";
import { SignOut } from "./SignOut";
import { SolarBillCheckLinear } from "./SolarBillCheckLinear";
import { SquaresFourWrapper } from "./SquaresFourWrapper";
import { TdesignMoney } from "./TdesignMoney";
import { TextInput } from "./TextInput";
import "./style.css";

export const Receptionist = () => {
  return (
    <div className="receptionist">
      <div className="div-2">
        <div className="sidemenu-large">
          <div className="container">
            <img className="line" alt="Line" src="line.svg" />
            <div className="overview">
              <div className="container-2">
                <SquaresFourWrapper className="squares-four" />
                <div className="text-wrapper-7">Dashboard</div>
              </div>
              <img className="img" alt="Line" src="image.svg" />
            </div>
            <div className="postal-services">POSTAL SERVICES</div>
            <div className="div-3">
              <div className="div-3">
                <div className="container-wrapper">
                  <div className="container-3">
                    <img className="vector" alt="Vector" src="vector.svg" />
                    <div className="text-wrapper-8">Normal Post</div>
                  </div>
                </div>
              </div>
              <div className="div-4">
                <img className="vector" alt="Vector" src="vector-2.svg" />
                <div className="text-wrapper-9">Registered Post</div>
              </div>
              <div className="div-4">
                <CubeWrapper className="cube-instance" />
                <div className="text-wrapper-9">Logi Post</div>
              </div>
              <div className="div-4">
                <MdiCourierFast className="mdi-courier-fast-instance" />
                <div className="text-wrapper-10">Logi Post</div>
              </div>
              <div className="div-4">
                <TdesignMoney className="icon-instance-node" />
                <div className="text-wrapper-9">Money Order</div>
              </div>
              <div className="div-4">
                <MdiAccountPaymentOutline className="icon-instance-node" />
                <div className="text-wrapper-9">Pay Money Order</div>
              </div>
            </div>
            <img className="line-2" alt="Line" src="line-2.svg" />
            <div className="div-3">
              <div className="other-services">OTHER SERVICES</div>
              <div className="div-4">
                <SolarBillCheckLinear className="icon-instance-node" />
                <div className="text-wrapper-9">Bill Payments</div>
              </div>
            </div>
            <img className="line-2" alt="Line" src="line-3.svg" />
          </div>
          <div className="designer-team" />
          <div className="div-4">
            <div className="sign-out">
              <SignOut className="sign-out-instance" />
            </div>
            <div className="text-wrapper-11">Log Out</div>
          </div>
        </div>
        <div className="top-bar">
          <div className="container-4">
            <Gear className="gear-instance" />
            <div className="toggle-mode">
              <MaterialSymbolsLightModeOutline className="material-symbols" />
            </div>
            <Gear className="gear-2" />
            <BellWrapper className="bell-instance" />
            <div className="user">
              <div className="profile-picture" />
              <div className="name">
                <div className="text-wrapper-12">Mr. Kalana Gamage</div>
                <div className="text-wrapper-13">Receptionist</div>
              </div>
              <CaretDownWrapper className="caret-down" />
            </div>
          </div>
          <MaterialSymbolsMenuRounded className="material-symbols-menu-rounded" />
          <img className="logo-final" alt="Logo final" src="logo-final-1.png" />
          <div className="text-wrapper-14">Receptionist Interface</div>
          <div className="text-wrapper-15">Post Office MIS</div>
        </div>
        <div className="recent-sales">
          <Select
            className="select-instance"
            mdiArrowDropDown="mdi-arrow-drop-down-4.svg"
            mdiArrowDropDownClassName="select-2"
            state="default"
            text="Destination Post Office "
            textBlockClassName="design-component-instance-node-2"
            type="required"
          />
          <Select
            className="select-3"
            mdiArrowDropDown="mdi-arrow-drop-down-3.svg"
            mdiArrowDropDownClassName="select-2"
            state="default"
            text="Accepted Post Office "
            textBlockClassName="design-component-instance-node-2"
            type="required"
          />
          <TextInput
            className="text-input-instance"
            divClassName="text-input-2"
            state="required"
            text="Recipient’s Name "
            textBlockClassName="design-component-instance-node-2"
          />
          <TextInput
            className="text-input-3"
            state="required"
            text="Recipient’s District "
            textBlockClassName="design-component-instance-node-2"
          />
          <TextInput
            className="text-input-4"
            state="required"
            text="Recipient’s Address "
            textBlockClassName="design-component-instance-node-2"
          />
          <TextInput
            className="text-input-5"
            state="required"
            text="Cost "
            textBlockClassName="design-component-instance-node-2"
          />
          <div className="text-wrapper-16">Normal Post</div>
          <Button className="button-instance" />
        </div>
        <div className="recent-sales-2">
          <div className="text-wrapper-17">Postal rates</div>
          <div className="select-4">
            <div className="text-wrapper-18">Select Type</div>
            <div className="overlap-group-wrapper">
              <div className="overlap-group">
                <div className="text-wrapper-19">Text</div>
                <img
                  className="mdi-arrow-drop-down-2"
                  alt="Mdi arrow drop down"
                  src="mdi-arrow-drop-down-2.svg"
                />
              </div>
            </div>
          </div>
          <div className="rs-wrapper">
            <div className="rs">
              Rs.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              .00
            </div>
          </div>
          <Button className="button-2" labelText="Calculate" />
          <img className="line-3" alt="Line" src="line-4.svg" />
        </div>
      </div>
    </div>
  );
};
