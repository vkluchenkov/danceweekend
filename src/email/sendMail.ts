import * as SibApiV3Sdk from '@sendinblue/client';
import { configServer } from '../configServer';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, configServer.brevo.token);

interface SendMailProps {
  senderEmail: string;
  senderName: string;
  recipientEmail: string;
  recipientName: string;
  recipientSubj: string;
  mailContent: string;
}

export const sendMail = (props: SendMailProps) => {
  const { senderEmail, senderName, recipientEmail, recipientName, recipientSubj, mailContent } =
    props;

  apiInstance.sendTransacEmail({
    sender: { email: senderEmail, name: senderName },
    subject: recipientSubj,
    to: [{ name: recipientName, email: recipientEmail }],
    htmlContent: mailContent,
  });
};
