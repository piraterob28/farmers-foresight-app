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
          tools {
            id
            name
            description
            active
            insertedAt
            useGuide
          }
        }
      }
    }
  }
`;

const startTaskTime:
  | DocumentNode
  | TypedDocumentNode<any, OperationVariables> = gql`
  mutation startRecordTaskTime($dailyChoreId: Int!) {
    startRecordTaskTime(dailyChoreId: $dailyChoreId)
  }
`;

const endTaskTime:
  | DocumentNode
  | TypedDocumentNode<any, OperationVariables> = gql`
  mutation endRecordTaskTime($dailyChoreId: Int!) {
    endRecordTaskTime(dailyChoreId: $dailyChoreId)
  }
`;

const setRecordTime:
  | DocumentNode
  | TypedDocumentNode<any, OperationVariables> = gql`
  mutation setRecordTime($dailyChoreId: Int!, $recordTime: Boolean!) {
    setRecordTime(dailyChoreId: $dailyChoreId, recordTime: $recordTime)
  }
`;

const dismissRecordTime:
  | DocumentNode
  | TypedDocumentNode<any, OperationVariables> = gql`
  mutation dismissRecordTime($dailyChoreId: Int!) {
    dismissRecordTime(dailyChoreId: $dailyChoreId)
  }
`;

const completeTaskMutation:
  | DocumentNode
  | TypedDocumentNode<any, OperationVariables> = gql`
  mutation completeTask($dailyChoreId: Int!, $notes: String) {
    completeTask(dailyChoreId: $dailyChoreId, notes: $notes)
  }
`;

export {
  getChoreListOneZone,
  startTaskTime,
  endTaskTime,
  setRecordTime,
  dismissRecordTime,
  completeTaskMutation,
};
