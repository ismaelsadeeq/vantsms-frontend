import React from 'react';
import {
  FaHome,
} from 'react-icons/fa';
import { MdAccountBox,MdMailOutline,MdHistory } from "react-icons/md";
import { SiWebmoney } from "react-icons/si";
import { AiFillFile,AiOutlineSetting } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";



export const links = [
  {
    id: 1,
    url: '/dashboard',
    text: 'dashboard',
    icon: <FaHome />,
  },
  {
    id: 2,
    url: '/profile',
    text: 'profile',
    icon: <MdAccountBox />,
  },
  // {
  //   id: 3,
  //   url: '/sms',
  //   text: 'sendSmS',
  //   icon: <MdMailOutline />,
  // },
  {
    id: 4,
    url: '/fund',
    text: 'fundAccount',
    icon: <SiWebmoney />,
  },
  {
    id: 5,
    url: '/transaction',
    text: 'transactions',
    icon: <MdHistory />,
  },
  {
    id: 6,
    url: '/kyc',
    text: 'kyc',
    icon: <AiFillFile />,
  },
  // {
  //   id: 7,
  //   url: '/setting',
  //   text: 'setting',
  //   icon: <AiOutlineSetting />,
  // },
  {
    id: 8,
    url: '/support',
    text: 'support',
    icon: <BiHelpCircle />,
  }
];
