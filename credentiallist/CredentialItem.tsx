import * as React from "react";
import { useTranslation } from "react-i18next";

import { VerifiableCredential } from "@services/mobileStorage/DataProviders/credentials";
import { IconListItem } from "@components/ListItem/variants";
import { issuerName } from "@utils/credentials/issuerName";
import { title } from "@utils/credentials/title";

type CredentialItemProps = {
  readonly credential: VerifiableCredential;
};

export const CredentialItem: React.FC<CredentialItemProps> = ({ credential }) => {
  const { t } = useTranslation();
  return (
    <IconListItem
      variant="icon"
      title={title(credential)}
      subtitle={issuerName(credential)}
      accessibilityLabel={t("Verifiable Credential")}
    />
  );
};
