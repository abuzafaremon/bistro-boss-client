import { BiSolidPhoneCall } from "react-icons/bi";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";

const OurLocation = () => {
  return (
    <div className="pt-5">
      <SectionHeader subTitle="---Visit Us---" title="Our Location" />
      <div className="bg-white p-2 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div>
            <div className="flex justify-center bg-yellow-600 py-1 text-white mr-0.5">
              <BiSolidPhoneCall />
            </div>
            <div className="flex items-center justify-center flex-col h-32 bg-base-200">
              <h3>PHONE</h3>
              <p>+38 (012) 34 56 789</p>
            </div>
          </div>
          <div>
            <div className="flex justify-center bg-yellow-600 py-1 text-white mr-0.5">
              <BiSolidPhoneCall />
            </div>
            <div className="flex items-center justify-center flex-col h-32 bg-base-200">
              <h3>ADDRESS</h3>
              <p>Dhaka 1200</p>
            </div>
          </div>
          <div>
            <div className="flex justify-center bg-yellow-600 py-1 text-white">
              <BiSolidPhoneCall />
            </div>
            <div className="flex items-center justify-center flex-col h-32 bg-base-200">
              <h3>WORKING HOURS</h3>
              <p>Mon - Fri: 08:00 - 22:00</p>
              <p>Sat - Sun: 10:00 - 23:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurLocation;
