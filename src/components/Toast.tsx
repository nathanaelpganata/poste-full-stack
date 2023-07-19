import * as React from 'react';
import { toast, ToastBar, Toaster, ToastOptions } from 'react-hot-toast';
import { ImCancelCircle } from 'react-icons/im';
import { AiFillCheckCircle, AiFillWarning } from 'react-icons/ai';
import { HiX } from 'react-icons/hi';
import { RiErrorWarningLine } from 'react-icons/ri';

export default function Toast() {
  return (
    <Toaster
      reverseOrder={false}
      position='top-right'
      toastOptions={{
        style: {
          borderRadius: '8px',
          background: '#20334D',
          color: '#8AB364',
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <button
                  className='rounded-full p-1 transition hover:bg-[#444] focus:outline-none focus-visible:ring'
                  onClick={() => toast.dismiss(t.id)}
                >
                  <HiX />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

const DEFAULT_TOAST: ToastOptions = {
  style: {
    background: '#F0F2F5',
    color: '#9AA2B1',
  },
  icon: <RiErrorWarningLine />,
  className: 'w-[300px] [&>div]:justify-start',
  position: 'top-right',
  duration: 5000,
};

const createCustomToast = (options: ToastOptions) => {
  return { ...DEFAULT_TOAST, ...options };
};

const showToast = (message: string, options?: ToastOptions) => {
  return toast(message, options || DEFAULT_TOAST);
};

export { createCustomToast, showToast };

const SUCCESS_TOAST = createCustomToast({
  style: {
    background: '#20334D',
    color: '#54C95E',
  },
  icon: <AiFillCheckCircle size={24} />,
  className:
    'w-[300px] [&>div]:justify-start border-[2px] border-[#54C95E] shadow-md shadow-[#277C30]',
  position: 'top-right',
  duration: 5000,
});
const DANGER_TOAST = createCustomToast({
  style: {
    background: '#20334D',
    color: '#D84A4D',
  },
  icon: <ImCancelCircle size={24} />,
  className:
    'w-[300px] [&>div]:justify-start border-2 border-[#D84A4D] shadow-md shadow-[#D84A4D]',
  position: 'top-right',
  duration: 5000,
});

const WARNING_TOAST = createCustomToast({
  style: {
    background: '#20334D',
    color: '#FEB100',
  },
  icon: <AiFillWarning size={24} />,
  className:
    'w-[300px] [&>div]:justify-start border-2 border-[#FEB100] shadow-md shadow-[#FEB100]',
  position: 'top-right',
  duration: 5000,
});

const LOADING_TOAST = createCustomToast({
  style: {
    background: '#20334D',
    color: '#9AA2B1',
  },
  icon: (
    <svg
      version='1.1'
      id='L5'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
      enable-background='new 0 0 0 0'
      style={{
        width: '30px',
        height: '30px',
        marginLeft: '5px',
        display: 'inline-block',
      }}
    >
      <circle fill='#fff' stroke='none' cx='6' cy='50' r='6'>
        <animateTransform
          attributeName='transform'
          dur='1s'
          type='translate'
          values='0 15 ; 0 -15; 0 15'
          repeatCount='indefinite'
          begin='0.1'
        />
      </circle>
      <circle fill='#fff' stroke='none' cx='30' cy='50' r='6'>
        <animateTransform
          attributeName='transform'
          dur='1s'
          type='translate'
          values='0 10 ; 0 -10; 0 10'
          repeatCount='indefinite'
          begin='0.2'
        />
      </circle>
      <circle fill='#fff' stroke='none' cx='54' cy='50' r='6'>
        <animateTransform
          attributeName='transform'
          dur='1s'
          type='translate'
          values='0 5 ; 0 -5; 0 5'
          repeatCount='indefinite'
          begin='0.3'
        />
      </circle>
    </svg>
  ),
  className:
    'w-[300px] [&>div]:justify-start border-2 border-[#FEB100] shadow-md shadow-[#FEB100]',
  position: 'top-right',
  duration: 3000,
});

export { DANGER_TOAST, SUCCESS_TOAST, WARNING_TOAST, LOADING_TOAST };
