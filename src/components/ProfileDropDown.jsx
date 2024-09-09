import React from 'react';
import { Link } from 'react-router-dom';
import "./ProfileDropDown.css";
import { User, Settings, Terminal, Circle, HelpCircle, UserPlus, Compass, Keyboard, FileText, LogOut } from 'lucide-react';

const ProfileDropDown = ({ userData, onLogout }) => {
  return (
    <div className="profile-dropdown bg-white rounded-lg shadow-lg p-4 w-72 border border-gray-200">
      <div className="profile-info mb-4 pb-2 border-b border-gray-300">
        <div className="profile-name text-lg font-semibold text-gray-800">{userData.username}</div>
        <div className="profile-email text-sm text-gray-600">{userData.email}</div>
      </div>
      <ul className="space-y-1">
        <DropdownItem icon={<User size={18} />} text="My Profile / Settings" to="/profile" />
        <DropdownItem icon={<Terminal size={18} />} text="Console" to="/console" />
        <DropdownItem icon={<Circle size={18} />} text="Coin" to="/coin" />
        <DropdownItem icon={<HelpCircle size={18} />} text="Support" to="/support" />
        <DropdownItem icon={<UserPlus size={18} />} text="Invite Friends" to="/invite" />
        <DropdownItem icon={<Compass size={18} />} text="Tour Kite" to="/tour" />
        <DropdownItem icon={<Keyboard size={18} />} text="Keyboard Shortcuts" to="/shortcuts" />
        <DropdownItem icon={<FileText size={18} />} text="User Manual" to="/manual" />
      </ul>
      <button 
        onClick={onLogout} 
        className="mt-4 w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
      >
        <LogOut size={18} />
        <span className="font-semibold">Logout</span>
      </button>
    </div>
  );
};

const DropdownItem = ({ icon, text, to }) => (
  <li>
    <Link to={to} className="flex items-center space-x-3 text-gray-800 hover:bg-gray-200 rounded-lg p-2 transition duration-150">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </Link>
  </li>
);

export default ProfileDropDown;
