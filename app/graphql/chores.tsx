import {gql} from '@apollo/client';
import {
  DocumentNode,
  TypedDocumentNode,
  OperationVariables,
} from '@apollo/client';

const getChoreListOneZone:
  | DocumentNode
  | TypedDocumentNode<any, OperationVariables> = gql`
  query getChoreListOneZone($choreCatagory: String!, $zoneId: Int!) {
    getChoreListOneZone(choreCatagory: $choreCatagory, zoneId: $zoneId) {
      id
      rowBatchId
      recurring
      recurrType
      recurrWeekDays
      startDate
      insertedAt
      updatedAt
      active
      assignedTo
      choreTypeId
      choreType {
        active
        choreType
        description
        id
        insertedAt
        name
        toolIds
        updatedAt
      }
    }
  }
`;

export {getChoreListOneZone};
