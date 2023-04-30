import styled from 'styled-components';

import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #dbdbdb8f;
  margin-top: 65px;
  background: #f9f9f9;
  `;
  
  export const FormContainer = styled.form`
  height: 200px;
  min-width: 450px;
  
  @media screen and (max-width: 800px) {
    min-width: 300px;
  }

  margin: 15px;
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;
