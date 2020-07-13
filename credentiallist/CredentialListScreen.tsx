import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ListRenderItem } from "react-native";

import { SecureContext } from "@services/secureContext/buildSecureContext";
import { CredentialLink } from "@components/Credentials/CredentialLink";
import { ParsedCredential } from "@services/mobileStorage/DataProviders/credentials";
import { EntityListPage } from "@components/EntityListPage";

import credentialImage from "../../../assets/images/image-credential.svg";

function getCredentialKey(credential: ParsedCredential): string {
  return credential.id;
}

const renderCredentialItem: ListRenderItem<ParsedCredential> = ({ item }) => <CredentialLink parsedCredential={item} />;

export const CredentialListScreen: React.FC = () => {
  const { t } = useTranslation();
  const { mobileStorage } = useContext(SecureContext);

  const [credentials, setCredentials] = useState(mobileStorage.service.credentials.objects());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = mobileStorage.service.credentials.subscribeObjects(updatedCredentials => {
      setCredentials(updatedCredentials);
    });
    return unsubscribe;
  }, [mobileStorage.service.credentials]);

  const refreshCredentials = async (): Promise<void> => {
    setCredentials(mobileStorage.service.credentials.objects());
    setRefreshing(false);
  };

  const handleRefresh = (): void => {
    setRefreshing(true);
    refreshCredentials();
  };
  return (
    <EntityListPage
      headerText={t("Credentials")}
      data={credentials}
      keyExtractor={getCredentialKey}
      renderItem={renderCredentialItem}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      placeholderAccessibilityLabel={t("Credentials")}
      placeholderSource={credentialImage}
      placeholderMessage={t("No credentials yet")}
      placeholderDescription={t("This is where you will find all of the credentials you accept")}
    />
  );
};
