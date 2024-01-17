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
      zoneIcons {
        dayChoreNumber
        lateChoreNumber
        dayHarvestNumber
        lateHarvestNumber
      }
    }
  }
`;

const setZonesQuickView:
  | DocumentNode
  | TypedDocumentNode<any, OperationVariables> = gql`
  mutation setZonesQuickView($zonesToUpdate: [ZoneDataInputs!]!) {
    setZonesQuickView(zonesToUpdate: $zonesToUpdate)
  }
`;

export {getZonesQuickView, setZonesQuickView};
