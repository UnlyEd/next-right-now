import React from 'react';

const AnimatedLoader = props => {
  return (
    <svg
      viewBox="0 0 200 200"
      style={{
        width: '6%',
        minWidth: 150,
      }}
      {...props}
    >
      <circle cx={100.112} cy={139.165} r={11.27} fill={'#0028FF'} className={'animate__animated animate__bounce animate__infinite animate__slower'} />
      <path d="M100.885 189.549c-21.767 0-40.771-17.789-40.771-38.12v-43.313h20.883v43.423c0 8.839 9.613 17.237 19.778 17.237 9.834 0 18.342-8.066 18.342-17.237v-43.423H140v43.423c.11 20.552-17.9 38.01-39.115 38.01z" />
    </svg>
  );
};

export default AnimatedLoader;
