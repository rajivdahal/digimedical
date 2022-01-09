import toast from 'react-hot-toast';
const success = (msg) => {
    toast.success(msg)
}
const loading = (msg) => {
    toast.loading(msg)
}
const error = (msg) => {
    toast.error(msg)
}

const promise=(argfunction)=>{
    toast.promise(
        argfunction,
        {
          loading: 'Loading',
          success: (data) => `${data}`,
          error: (err) => `${err}`,
        },
        {
          style: {
            minWidth: '250px',
          },
          success: {
            duration: 10000,
            icon: '🔥',
          },
        }
      );
}

export const notify = {
    success,
    loading,
    error,
    promise
}
