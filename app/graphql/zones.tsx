import {gql} from '@apollo/client';
import {
  DocumentNode,
  TypedDocumentNode,
  OperationVariables,
} from '@apollo/client';

const getZonesQuickView:
  | DocumentNode
  | TypedDocumentNode<any, OperationVariables> = gql`
  query getZonesQuickView {
    getZonesQuickView {
      active
      covered
      farmId
      farmZoneNumber
      id
      indoor
      insertedAt
      length
      mapX
      mapY
      updatedAt
      width
    }
  }
`;

const setZonesQuickView:
  | DocumentNode
  | TypedDocumentNode<any, OperationVariables> = gql`
  mutation setZonesQuickView($zonesToUpdate: [ZoneProps]!) {
    setZonesQuickView(zonesToUpdate: $zonesToUpdate) {
      id
      length
      mapX
      mapY
      updatedAt
      width
    }
  }
`;

export {getZonesQuickView, setZonesQuickView};
