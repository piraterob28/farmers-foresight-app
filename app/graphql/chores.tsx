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
      choreId
      active
      choreBatchId
      completed
      completedBy
      insertedAt
      notes
      recordTime
      timeEnd
      timeStart
      todoDate
      updatedAt
      choreData {
        id
        rowBatchId
        rowNumber
        zoneNumber
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
          averageChoreTime
          id
          insertedAt
          name
          toolIds
          updatedAt
        }
      }
    }
  }
`;

export {getChoreListOneZone};
