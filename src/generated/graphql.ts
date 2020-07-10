import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   * 
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: any;
  /**
   * Leverages the internal Python implmeentation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /** This is the Nodes Outputs  */
  Outputs: any;
  /** This is the Nodes Input Representation */
  Inputs: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
};

/** This is the Root Query */
export type Query = {
   __typename?: 'Query';
  /** Get all nodes in this bergen instance */
  nodes?: Maybe<Array<Maybe<NodeType>>>;
  /** Get a nodes in this bergen instance */
  node?: Maybe<NodeType>;
  /** Show the status of a Provision */
  monitor?: Maybe<ProvisionType>;
  monitor2?: Maybe<MonitorQuery>;
  /** All Representations */
  allRepresentation?: Maybe<Array<Maybe<RepresentationType>>>;
  /** All Representations */
  allSamples?: Maybe<Array<Maybe<SampleType>>>;
  /** Representations by ID */
  Representation?: Maybe<RepresentationType>;
  /** Get the graph */
  graph?: Maybe<GraphType>;
  /** Get all Flows */
  allFlows?: Maybe<Array<Maybe<FlowNodeType>>>;
  /** Get the flow */
  flow?: Maybe<FlowNodeType>;
};


/** This is the Root Query */
export type QueryNodesArgs = {
  name?: Maybe<Scalars['String']>;
  name_Icontains?: Maybe<Scalars['String']>;
  name_Istartswith?: Maybe<Scalars['String']>;
};


/** This is the Root Query */
export type QueryNodeArgs = {
  id?: Maybe<Scalars['ID']>;
};


/** This is the Root Query */
export type QueryMonitorArgs = {
  reference?: Maybe<Scalars['String']>;
};


/** This is the Root Query */
export type QueryMonitor2Args = {
  reference: Scalars['String'];
};


/** This is the Root Query */
export type QueryRepresentationArgs = {
  id: Scalars['Int'];
};


/** This is the Root Query */
export type QueryGraphArgs = {
  id: Scalars['ID'];
};


/** This is the Root Query */
export type QueryAllFlowsArgs = {
  name?: Maybe<Scalars['String']>;
  name_Icontains?: Maybe<Scalars['String']>;
  name_Istartswith?: Maybe<Scalars['String']>;
};


/** This is the Root Query */
export type QueryFlowArgs = {
  id: Scalars['ID'];
};

export type NodeType = {
   __typename?: 'NodeType';
  id: Scalars['ID'];
  /** A unique identifier of this Node on this Platform, calculated hashing the package and interface */
  identifier: Scalars['String'];
  /** Is this Node a Frontend, Backend, DaskExlusiv Node? */
  variety: Scalars['String'];
  /** The realm this Node was registered to? */
  realm: Scalars['String'];
  /** The Package this Node belongs to */
  package: Scalars['String'];
  /** The unique interface of this Node within the Package */
  interface: Scalars['String'];
  /** The publishers thie Node will send to */
  publishers: Scalars['JSONString'];
  /** The Package that channel belongs to */
  name: Scalars['String'];
  /** A Short description for the Node */
  description: Scalars['String'];
  inputs?: Maybe<Array<Maybe<PortType>>>;
  outputs?: Maybe<Array<Maybe<PortType>>>;
  nodeclass: Scalars['String'];
  routes: Array<RouteType>;
  /** The node this Pod is an instance of */
  pods: Array<PodType>;
  /** The node this provision connects */
  provisions: Array<ProvisionType>;
  flownode?: Maybe<FlowNodeType>;
};


export type PortType = BoolPortType | CharPortType | IntPortType | FilePortType | ListPortType | UuidPortType | ModelPortType | ObjectPortType | BasePortType;

export type BoolPortType = {
   __typename?: 'BoolPortType';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type CharPortType = {
   __typename?: 'CharPortType';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type IntPortType = {
   __typename?: 'IntPortType';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type FilePortType = {
   __typename?: 'FilePortType';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type ListPortType = {
   __typename?: 'ListPortType';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type UuidPortType = {
   __typename?: 'UUIDPortType';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type ModelPortType = {
   __typename?: 'ModelPortType';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  identifier?: Maybe<Scalars['String']>;
};

export type ObjectPortType = {
   __typename?: 'ObjectPortType';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  ports?: Maybe<Array<Maybe<PortType>>>;
  identifier?: Maybe<Scalars['String']>;
};

export type BasePortType = {
   __typename?: 'BasePortType';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type RouteType = {
   __typename?: 'RouteType';
  id: Scalars['ID'];
  /** A unique identifier of this Route on this Platform, calculated hashing the package and interface */
  identifier: Scalars['String'];
  /** The url to the Route */
  url: Scalars['String'];
  /** The Package this Node belongs to */
  package: Scalars['String'];
  /** The Provider of this Route */
  provider: Scalars['String'];
  /** The unique interface of this Node within the Package */
  interface: Scalars['String'];
  /** The Package that channel belongs to */
  name: Scalars['String'];
  /** A Short description for the Node */
  description: Scalars['String'];
  node?: Maybe<NodeType>;
};

export type PodType = {
   __typename?: 'PodType';
  id: Scalars['ID'];
  /** The node this Pod is an instance of */
  node: NodeType;
  podclass: Scalars['String'];
  status: Scalars['String'];
  /** The provisioner that created this Pod */
  provider: Scalars['String'];
  /** The Unique identifier of this POD */
  unique: Scalars['UUID'];
  /** The Unique identifier of this POD */
  reference?: Maybe<Scalars['String']>;
  persistent: Scalars['Boolean'];
  /** The pod this provision connects */
  provisions: Array<ProvisionType>;
  /** The Pod this Job lives on */
  jobSet: Array<JobType>;
  frontendpod?: Maybe<FrontendPodType>;
};


export type ProvisionType = {
   __typename?: 'ProvisionType';
  id: Scalars['ID'];
  /** The Provisions parent */
  parent?: Maybe<ProvisionType>;
  /** The node this provision connects */
  node: NodeType;
  /** The pod this provision connects */
  pod?: Maybe<PodType>;
  /** The Provider */
  provider: Scalars['String'];
  /** The selector */
  subselector: Scalars['String'];
  /** The Unique identifier of this Provision */
  reference: Scalars['String'];
  /** This provisions status */
  status: Scalars['String'];
  /** This provision creator */
  user: UserType;
  children?: Maybe<Array<Maybe<ProvisionType>>>;
};

export type UserType = {
   __typename?: 'UserType';
  id: Scalars['ID'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean'];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  dateJoined: Scalars['DateTime'];
  /** This provision creator */
  provisionSet: Array<ProvisionType>;
  jobSet: Array<JobType>;
  sampleSet: Array<SampleType>;
  /** The Person that created this representation */
  representationSet: Array<RepresentationType>;
  roiSet: Array<RoiType>;
  graphSet: Array<GraphType>;
};


export type JobType = {
   __typename?: 'JobType';
  id: Scalars['ID'];
  inputs?: Maybe<Scalars['Outputs']>;
  outputs?: Maybe<Scalars['Inputs']>;
  settings: Scalars['JSONString'];
  status: Scalars['String'];
  creator: UserType;
  /** The Pod this Job lives on */
  pod?: Maybe<PodType>;
  /** The Nodeinstance this Job lives on */
  reference: Scalars['String'];
  /** The Selectivity for Instances of this Node (especially unique Frontends) */
  selector: Scalars['String'];
  unique: Scalars['UUID'];
};



/**  A sgfsefsef is a multi-dimensional Array that can do what ever it wants  */
export type SampleType = {
   __typename?: 'SampleType';
  id: Scalars['ID'];
  creator: UserType;
  name: Scalars['String'];
  nodeid?: Maybe<Scalars['String']>;
  /** The Sample this representation belongs to */
  representations: Array<RepresentationType>;
};

/**  A Representation is 5-dimensional representation of a microscopic image  */
export type RepresentationType = {
   __typename?: 'RepresentationType';
  id: Scalars['ID'];
  /** The location of the Array on the Storage System (S3 or Media-URL) */
  store?: Maybe<Scalars['String']>;
  /** The arrays shape */
  shape: Array<Maybe<Scalars['Int']>>;
  /** The arrays dimension */
  dims: Array<Maybe<Scalars['String']>>;
  /** Cleartext name */
  name?: Maybe<Scalars['String']>;
  /** The arrays unique signature (check Doc on: Signatures) */
  signature?: Maybe<Scalars['String']>;
  /** A unique identifier for this array */
  unique: Scalars['UUID'];
  /** The File Version of this Array */
  fileversion: Scalars['String'];
  /** The Person that created this representation */
  creator: UserType;
  origin?: Maybe<RepresentationType>;
  /** The Sample this representation belongs to */
  sample: SampleType;
  /** The Representation can have varying types, consult your API */
  type?: Maybe<Scalars['String']>;
  chain?: Maybe<Scalars['String']>;
  nodeid?: Maybe<Scalars['String']>;
  derived: Array<RepresentationType>;
  rois: Array<RoiType>;
};

/** ROI(id, nodeid, creator, vectors, color, signature, created_at, representation, experimentalgroup) */
export type RoiType = {
   __typename?: 'ROIType';
  id: Scalars['ID'];
  nodeid?: Maybe<Scalars['String']>;
  creator: UserType;
  /** A json dump of the ROI Vectors (specific for each type) */
  vectors: Scalars['String'];
  color?: Maybe<Scalars['String']>;
  signature?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  representation?: Maybe<RepresentationType>;
};

/** Graph(id, creator, group, version, name, diagram, description) */
export type GraphType = {
   __typename?: 'GraphType';
  id: Scalars['ID'];
  creator?: Maybe<UserType>;
  version: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  diagram?: Maybe<Scalars['GenericScalar']>;
  description: Scalars['String'];
  flownodeSet: Array<FlowNodeType>;
};


/** FlowNode(id, identifier, variety, realm, package, interface, publishers, name, description, inputs, outputs, nodeclass, node_ptr, graph) */
export type FlowNodeType = {
   __typename?: 'FlowNodeType';
  id: Scalars['ID'];
  /** A unique identifier of this Node on this Platform, calculated hashing the package and interface */
  identifier: Scalars['String'];
  /** Is this Node a Frontend, Backend, DaskExlusiv Node? */
  variety: Scalars['String'];
  /** The realm this Node was registered to? */
  realm: Scalars['String'];
  /** The Package this Node belongs to */
  package: Scalars['String'];
  /** The unique interface of this Node within the Package */
  interface: Scalars['String'];
  /** The publishers thie Node will send to */
  publishers: Scalars['JSONString'];
  /** The Package that channel belongs to */
  name: Scalars['String'];
  /** A Short description for the Node */
  description: Scalars['String'];
  inputs?: Maybe<Array<Maybe<PortType>>>;
  outputs?: Maybe<Array<Maybe<PortType>>>;
  nodeclass: Scalars['String'];
  nodePtr: NodeType;
  graph?: Maybe<GraphType>;
};

export type FrontendPodType = {
   __typename?: 'FrontendPodType';
  id: Scalars['ID'];
  /** The node this Pod is an instance of */
  node: NodeType;
  podclass: Scalars['String'];
  status: Scalars['String'];
  /** The provisioner that created this Pod */
  provider: Scalars['String'];
  /** The Unique identifier of this POD */
  unique: Scalars['UUID'];
  /** The Unique identifier of this POD */
  reference?: Maybe<Scalars['String']>;
  persistent: Scalars['Boolean'];
  podPtr: PodType;
  /** The Gate ID of this Pod */
  gate: Scalars['String'];
  access: Scalars['JSONString'];
};

export type MonitorQuery = {
   __typename?: 'MonitorQuery';
  /** The Id of this Provision */
  id?: Maybe<Scalars['ID']>;
  /** The Node you Provisioned */
  node?: Maybe<NodeType>;
  /** The Provisioned Pod unique Id */
  pod?: Maybe<PodType>;
  /** The Provider of this Pod */
  error?: Maybe<Scalars['String']>;
  /** The status of this Pod */
  status?: Maybe<Scalars['String']>;
  /** This Provisions reference */
  reference?: Maybe<Scalars['String']>;
  /** This Pods status */
  subselector?: Maybe<Scalars['String']>;
  /** This Pods status */
  user?: Maybe<UserType>;
  /** This Pods status */
  provider?: Maybe<Scalars['String']>;
  /** This Provisions children */
  children?: Maybe<Array<Maybe<ProvisionType>>>;
  /** This Provisions parent */
  parent?: Maybe<ProvisionType>;
};

/** All Mutations are to be found here */
export type Mutation = {
   __typename?: 'Mutation';
  slot?: Maybe<SlotMutation>;
  provide?: Maybe<ProvisionType>;
  assign?: Maybe<AssignMutation>;
  createGraph?: Maybe<CreateFlowMutation>;
  toFlow?: Maybe<ToFlowMutation>;
};


/** All Mutations are to be found here */
export type MutationSlotArgs = {
  gate: Scalars['String'];
  job: Scalars['String'];
  outputs?: Maybe<Scalars['GenericScalar']>;
};


/** All Mutations are to be found here */
export type MutationProvideArgs = {
  node: Scalars['ID'];
  parent?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  selector?: Maybe<Scalars['String']>;
};


/** All Mutations are to be found here */
export type MutationAssignArgs = {
  inputs: Scalars['GenericScalar'];
  pod: Scalars['ID'];
  reference?: Maybe<Scalars['String']>;
};


/** All Mutations are to be found here */
export type MutationCreateGraphArgs = {
  description?: Maybe<Scalars['String']>;
  diagram?: Maybe<Scalars['GenericScalar']>;
  name: Scalars['String'];
  version?: Maybe<Scalars['String']>;
};


/** All Mutations are to be found here */
export type MutationToFlowArgs = {
  graph: Scalars['ID'];
};

export type SlotMutation = {
   __typename?: 'SlotMutation';
  status?: Maybe<Scalars['String']>;
};

export type AssignMutation = {
   __typename?: 'AssignMutation';
  /** The Id of this Provision */
  id?: Maybe<Scalars['ID']>;
  /** The Node you Provisioned */
  node?: Maybe<NodeType>;
  /** The Provisioned Pod unique Id */
  pod?: Maybe<PodType>;
  /** The Provider of this Pod */
  error?: Maybe<Scalars['String']>;
  /** The status of this Pod */
  status?: Maybe<Scalars['String']>;
  /** This Provisions reference */
  reference?: Maybe<Scalars['String']>;
  /** This Pods status */
  subselector?: Maybe<Scalars['String']>;
  /** This Pods status */
  user?: Maybe<UserType>;
  /** This Pods status */
  provider?: Maybe<Scalars['String']>;
  /** This Provisions children */
  children?: Maybe<Array<Maybe<ProvisionType>>>;
  /** This Provisions parent */
  parent?: Maybe<ProvisionType>;
};

export type CreateFlowMutation = {
   __typename?: 'CreateFlowMutation';
  status?: Maybe<Scalars['String']>;
  /** The Graph */
  graph?: Maybe<GraphType>;
};

export type ToFlowMutation = {
   __typename?: 'ToFlowMutation';
  status?: Maybe<Scalars['String']>;
  /** The Generated FlowNode */
  node?: Maybe<FlowNodeType>;
};

/** All Subscriptions are to be found here */
export type Subscription = {
   __typename?: 'Subscription';
  provide?: Maybe<ProvisionType>;
  monitor?: Maybe<ProvisionType>;
  gate?: Maybe<GateSubscription>;
  maxisp?: Maybe<MaxispJob>;
  prewitt?: Maybe<PrewittJob>;
  drawer?: Maybe<DrawerJob>;
};


/** All Subscriptions are to be found here */
export type SubscriptionProvideArgs = {
  node: Scalars['ID'];
  parent?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  selector?: Maybe<Scalars['String']>;
};


/** All Subscriptions are to be found here */
export type SubscriptionMonitorArgs = {
  reference: Scalars['String'];
};


/** All Subscriptions are to be found here */
export type SubscriptionGateArgs = {
  unique: Scalars['String'];
};


/** All Subscriptions are to be found here */
export type SubscriptionMaxispArgs = {
  pod: Scalars['ID'];
  reference?: Maybe<Scalars['String']>;
  rep: Scalars['ID'];
  slice?: Maybe<ArgumentsSlice>;
};


/** All Subscriptions are to be found here */
export type SubscriptionPrewittArgs = {
  pod: Scalars['ID'];
  reference?: Maybe<Scalars['String']>;
  rep: Scalars['ID'];
  sigma?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


/** All Subscriptions are to be found here */
export type SubscriptionDrawerArgs = {
  pod: Scalars['ID'];
  reference?: Maybe<Scalars['String']>;
  rep: Scalars['ID'];
};

export type GateSubscription = {
   __typename?: 'GateSubscription';
  inputs?: Maybe<Scalars['GenericScalar']>;
  outputs?: Maybe<Scalars['GenericScalar']>;
  reference?: Maybe<Scalars['String']>;
  selector?: Maybe<Scalars['String']>;
  pod?: Maybe<PodType>;
  creator?: Maybe<UserType>;
  settings?: Maybe<Scalars['GenericScalar']>;
  id?: Maybe<Scalars['ID']>;
  unique?: Maybe<Scalars['String']>;
  statusmessage?: Maybe<Scalars['String']>;
  statuscode?: Maybe<Scalars['Int']>;
};

export type MaxispJob = {
   __typename?: 'MaxispJob';
  id: Scalars['ID'];
  settings: Scalars['JSONString'];
  status: Scalars['String'];
  creator: UserType;
  /** The Pod this Job lives on */
  pod?: Maybe<PodType>;
  /** The Nodeinstance this Job lives on */
  reference: Scalars['String'];
  /** The Selectivity for Instances of this Node (especially unique Frontends) */
  selector: Scalars['String'];
  unique: Scalars['UUID'];
  /** The outputs of this Job */
  outputs?: Maybe<MaxispOutputs>;
  /** The inputs of this Job */
  inputs?: Maybe<MaxispInputs>;
};

/** This is the Outputs */
export type MaxispOutputs = {
   __typename?: 'MaxispOutputs';
  /** The Outgoing Representation (with altered dimensions) */
  rep: RepresentationType;
};

/** This is the Inputs */
export type MaxispInputs = {
   __typename?: 'MaxispInputs';
  /** The Representation that will be projected */
  rep: RepresentationType;
  slice?: Maybe<Slice>;
};

/** A Slice is an Extension of a Lower and Upper Item */
export type Slice = {
   __typename?: 'Slice';
  /** The Upper Index / The Upper Limit for the Slice */
  upper: Scalars['Int'];
  /** The Lower Index / The Lower Limit for the Slice */
  lower: Scalars['Int'];
};

/** A Slice is an Extension of a Lower and Upper Item */
export type ArgumentsSlice = {
  /** The Upper Index / The Upper Limit for the Slice */
  upper: Scalars['Int'];
  /** The Lower Index / The Lower Limit for the Slice */
  lower: Scalars['Int'];
};

export type PrewittJob = {
   __typename?: 'PrewittJob';
  id: Scalars['ID'];
  settings: Scalars['JSONString'];
  status: Scalars['String'];
  creator: UserType;
  /** The Pod this Job lives on */
  pod?: Maybe<PodType>;
  /** The Nodeinstance this Job lives on */
  reference: Scalars['String'];
  /** The Selectivity for Instances of this Node (especially unique Frontends) */
  selector: Scalars['String'];
  unique: Scalars['UUID'];
  /** The outputs of this Job */
  outputs?: Maybe<PrewittOutputs>;
  /** The inputs of this Job */
  inputs?: Maybe<PrewittInputs>;
};

/** This is the Outputs */
export type PrewittOutputs = {
   __typename?: 'PrewittOutputs';
  /** The Outgoing Representation (with altered dimensions) */
  rep: RepresentationType;
};

/** This is the Inputs */
export type PrewittInputs = {
   __typename?: 'PrewittInputs';
  /** The Incoming Representation||This Representation will be filtered */
  rep: RepresentationType;
  /** The Upper Index / The Upper Limit for the Slice */
  sigma?: Maybe<Scalars['Int']>;
  /**  The title for thisSlice */
  title?: Maybe<Scalars['String']>;
};

export type DrawerJob = {
   __typename?: 'DrawerJob';
  id: Scalars['ID'];
  settings: Scalars['JSONString'];
  status: Scalars['String'];
  creator: UserType;
  /** The Pod this Job lives on */
  pod?: Maybe<PodType>;
  /** The Nodeinstance this Job lives on */
  reference: Scalars['String'];
  /** The Selectivity for Instances of this Node (especially unique Frontends) */
  selector: Scalars['String'];
  unique: Scalars['UUID'];
  /** The outputs of this Job */
  outputs?: Maybe<DrawerOutputs>;
  /** The inputs of this Job */
  inputs?: Maybe<DrawerInputs>;
};

/** This is the Outputs */
export type DrawerOutputs = {
   __typename?: 'DrawerOutputs';
  vectors?: Maybe<Vectors>;
};

export type Vectors = {
   __typename?: 'Vectors';
  x: Array<Maybe<Scalars['Float']>>;
  y: Array<Maybe<Scalars['Float']>>;
};

/** This is the Inputs */
export type DrawerInputs = {
   __typename?: 'DrawerInputs';
  rep: RepresentationType;
};

export type MonitorqueryQueryVariables = {
  reference: Scalars['String'];
};


export type MonitorqueryQuery = (
  { __typename?: 'Query' }
  & { data?: Maybe<(
    { __typename?: 'ProvisionType' }
    & Pick<ProvisionType, 'provider'>
    & { pod?: Maybe<(
      { __typename?: 'PodType' }
      & Pick<PodType, 'status' | 'persistent' | 'unique'>
    )>, node: (
      { __typename?: 'NodeType' }
      & Pick<NodeType, 'id'>
      & { inputs?: Maybe<Array<Maybe<{ __typename: 'BoolPortType' } | { __typename: 'CharPortType' } | { __typename: 'IntPortType' } | { __typename: 'FilePortType' } | { __typename: 'ListPortType' } | { __typename: 'UUIDPortType' } | { __typename: 'ModelPortType' } | { __typename: 'ObjectPortType' } | { __typename: 'BasePortType' }>>>, outputs?: Maybe<Array<Maybe<{ __typename: 'BoolPortType' } | { __typename: 'CharPortType' } | { __typename: 'IntPortType' } | { __typename: 'FilePortType' } | { __typename: 'ListPortType' } | { __typename: 'UUIDPortType' } | { __typename: 'ModelPortType' } | { __typename: 'ObjectPortType' } | { __typename: 'BasePortType' }>>> }
    ) }
  )> }
);

export type MonitorsubscribeSubscriptionVariables = {
  reference: Scalars['String'];
};


export type MonitorsubscribeSubscription = (
  { __typename?: 'Subscription' }
  & { data?: Maybe<(
    { __typename?: 'ProvisionType' }
    & { pod?: Maybe<(
      { __typename?: 'PodType' }
      & Pick<PodType, 'provider' | 'status' | 'persistent' | 'unique'>
    )>, node: (
      { __typename?: 'NodeType' }
      & Pick<NodeType, 'id'>
      & { inputs?: Maybe<Array<Maybe<{ __typename: 'BoolPortType' } | { __typename: 'CharPortType' } | { __typename: 'IntPortType' } | { __typename: 'FilePortType' } | { __typename: 'ListPortType' } | { __typename: 'UUIDPortType' } | { __typename: 'ModelPortType' } | { __typename: 'ObjectPortType' } | { __typename: 'BasePortType' }>>>, outputs?: Maybe<Array<Maybe<{ __typename: 'BoolPortType' } | { __typename: 'CharPortType' } | { __typename: 'IntPortType' } | { __typename: 'FilePortType' } | { __typename: 'ListPortType' } | { __typename: 'UUIDPortType' } | { __typename: 'ModelPortType' } | { __typename: 'ObjectPortType' } | { __typename: 'BasePortType' }>>> }
    ), user: (
      { __typename?: 'UserType' }
      & Pick<UserType, 'username'>
    ) }
  )> }
);

export type ProvideNodeMutationVariables = {
  node: Scalars['ID'];
  selector?: Maybe<Scalars['String']>;
};


export type ProvideNodeMutation = (
  { __typename?: 'Mutation' }
  & { provide?: Maybe<(
    { __typename?: 'ProvisionType' }
    & Pick<ProvisionType, 'provider' | 'reference'>
    & { node: (
      { __typename?: 'NodeType' }
      & Pick<NodeType, 'name'>
    ), pod?: Maybe<(
      { __typename?: 'PodType' }
      & Pick<PodType, 'id'>
    )>, user: (
      { __typename?: 'UserType' }
      & Pick<UserType, 'id'>
    ) }
  )> }
);

export type AllNodesQueryVariables = {};


export type AllNodesQuery = (
  { __typename?: 'Query' }
  & { nodes?: Maybe<Array<Maybe<(
    { __typename?: 'NodeType' }
    & Pick<NodeType, 'id' | 'name' | 'variety'>
  )>>> }
);

export type GraphNodeQueryVariables = {
  id: Scalars['ID'];
};


export type GraphNodeQuery = (
  { __typename?: 'Query' }
  & { node?: Maybe<(
    { __typename?: 'NodeType' }
    & Pick<NodeType, 'name' | 'description' | 'package' | 'interface' | 'variety'>
    & { outputs?: Maybe<Array<Maybe<(
      { __typename?: 'BoolPortType' }
      & Ports_BoolPortType_Fragment
    ) | (
      { __typename?: 'CharPortType' }
      & Ports_CharPortType_Fragment
    ) | (
      { __typename?: 'IntPortType' }
      & Ports_IntPortType_Fragment
    ) | (
      { __typename?: 'FilePortType' }
      & Ports_FilePortType_Fragment
    ) | (
      { __typename?: 'ListPortType' }
      & Ports_ListPortType_Fragment
    ) | (
      { __typename?: 'UUIDPortType' }
      & Ports_UuidPortType_Fragment
    ) | (
      { __typename?: 'ModelPortType' }
      & Ports_ModelPortType_Fragment
    ) | (
      { __typename?: 'ObjectPortType' }
      & Ports_ObjectPortType_Fragment
    ) | (
      { __typename?: 'BasePortType' }
      & Ports_BasePortType_Fragment
    )>>>, inputs?: Maybe<Array<Maybe<(
      { __typename?: 'BoolPortType' }
      & Ports_BoolPortType_Fragment
    ) | (
      { __typename?: 'CharPortType' }
      & Ports_CharPortType_Fragment
    ) | (
      { __typename?: 'IntPortType' }
      & Ports_IntPortType_Fragment
    ) | (
      { __typename?: 'FilePortType' }
      & Ports_FilePortType_Fragment
    ) | (
      { __typename?: 'ListPortType' }
      & Ports_ListPortType_Fragment
    ) | (
      { __typename?: 'UUIDPortType' }
      & Ports_UuidPortType_Fragment
    ) | (
      { __typename?: 'ModelPortType' }
      & Ports_ModelPortType_Fragment
    ) | (
      { __typename?: 'ObjectPortType' }
      & Ports_ObjectPortType_Fragment
    ) | (
      { __typename?: 'BasePortType' }
      & Ports_BasePortType_Fragment
    )>>> }
  )> }
);

type Ports_BoolPortType_Fragment = (
  { __typename: 'BoolPortType' }
  & Pick<BoolPortType, 'key' | 'name' | 'description' | 'required' | 'default'>
);

type Ports_CharPortType_Fragment = (
  { __typename: 'CharPortType' }
  & Pick<CharPortType, 'key' | 'name' | 'description' | 'required' | 'default'>
);

type Ports_IntPortType_Fragment = (
  { __typename: 'IntPortType' }
  & Pick<IntPortType, 'key' | 'name' | 'description' | 'required' | 'default'>
);

type Ports_FilePortType_Fragment = (
  { __typename: 'FilePortType' }
  & Pick<FilePortType, 'key' | 'name' | 'description' | 'required' | 'default'>
);

type Ports_ListPortType_Fragment = (
  { __typename: 'ListPortType' }
  & Pick<ListPortType, 'key' | 'name' | 'description' | 'required' | 'default'>
);

type Ports_UuidPortType_Fragment = (
  { __typename: 'UUIDPortType' }
  & Pick<UuidPortType, 'key' | 'name' | 'description' | 'required' | 'default'>
);

type Ports_ModelPortType_Fragment = (
  { __typename: 'ModelPortType' }
  & Pick<ModelPortType, 'key' | 'name' | 'description' | 'required' | 'default'>
);

type Ports_ObjectPortType_Fragment = (
  { __typename: 'ObjectPortType' }
  & Pick<ObjectPortType, 'key' | 'name' | 'description' | 'required' | 'default'>
);

type Ports_BasePortType_Fragment = { __typename?: 'BasePortType' };

export type PortsFragment = Ports_BoolPortType_Fragment | Ports_CharPortType_Fragment | Ports_IntPortType_Fragment | Ports_FilePortType_Fragment | Ports_ListPortType_Fragment | Ports_UuidPortType_Fragment | Ports_ModelPortType_Fragment | Ports_ObjectPortType_Fragment | Ports_BasePortType_Fragment;

export type CreateGraphMutationVariables = {
  diagram: Scalars['GenericScalar'];
  name: Scalars['String'];
};


export type CreateGraphMutation = (
  { __typename?: 'Mutation' }
  & { createGraph?: Maybe<(
    { __typename?: 'CreateFlowMutation' }
    & Pick<CreateFlowMutation, 'status'>
    & { graph?: Maybe<(
      { __typename?: 'GraphType' }
      & Pick<GraphType, 'id' | 'name' | 'description'>
    )> }
  )> }
);

export type ConvertToFlotMutationVariables = {
  graph: Scalars['ID'];
};


export type ConvertToFlotMutation = (
  { __typename?: 'Mutation' }
  & { toFlow?: Maybe<(
    { __typename?: 'ToFlowMutation' }
    & Pick<ToFlowMutation, 'status'>
    & { node?: Maybe<(
      { __typename?: 'FlowNodeType' }
      & { inputs?: Maybe<Array<Maybe<{ __typename: 'BoolPortType' } | { __typename: 'CharPortType' } | { __typename: 'IntPortType' } | { __typename: 'FilePortType' } | { __typename: 'ListPortType' } | { __typename: 'UUIDPortType' } | { __typename: 'ModelPortType' } | { __typename: 'ObjectPortType' } | { __typename: 'BasePortType' }>>>, outputs?: Maybe<Array<Maybe<{ __typename: 'BoolPortType' } | { __typename: 'CharPortType' } | { __typename: 'IntPortType' } | { __typename: 'FilePortType' } | { __typename: 'ListPortType' } | { __typename: 'UUIDPortType' } | { __typename: 'ModelPortType' } | { __typename: 'ObjectPortType' } | { __typename: 'BasePortType' }>>> }
    )> }
  )> }
);

export type ProvisionNodeSubscriptionVariables = {
  id: Scalars['ID'];
  reference?: Maybe<Scalars['String']>;
  selector?: Maybe<Scalars['String']>;
};


export type ProvisionNodeSubscription = (
  { __typename?: 'Subscription' }
  & { provide?: Maybe<(
    { __typename?: 'ProvisionType' }
    & Pick<ProvisionType, 'reference' | 'status'>
    & { pod?: Maybe<(
      { __typename?: 'PodType' }
      & Pick<PodType, 'id' | 'status' | 'unique' | 'provider'>
    )>, node: (
      { __typename?: 'NodeType' }
      & Pick<NodeType, 'id' | 'name'>
      & { inputs?: Maybe<Array<Maybe<{ __typename: 'BoolPortType' } | { __typename: 'CharPortType' } | { __typename: 'IntPortType' } | { __typename: 'FilePortType' } | { __typename: 'ListPortType' } | { __typename: 'UUIDPortType' } | { __typename: 'ModelPortType' } | { __typename: 'ObjectPortType' } | { __typename: 'BasePortType' }>>>, outputs?: Maybe<Array<Maybe<{ __typename: 'BoolPortType' } | { __typename: 'CharPortType' } | { __typename: 'IntPortType' } | { __typename: 'FilePortType' } | { __typename: 'ListPortType' } | { __typename: 'UUIDPortType' } | { __typename: 'ModelPortType' } | { __typename: 'ObjectPortType' } | { __typename: 'BasePortType' }>>> }
    ), user: (
      { __typename?: 'UserType' }
      & Pick<UserType, 'username' | 'firstName' | 'lastName'>
    ) }
  )> }
);

export const Ports = gql`
    fragment Ports on PortType {
  ... on IntPortType {
    __typename
    key
    name
    description
    required
    default
  }
  ... on CharPortType {
    __typename
    key
    name
    description
    required
    default
  }
  ... on BoolPortType {
    __typename
    key
    name
    description
    required
    default
  }
  ... on UUIDPortType {
    __typename
    key
    name
    description
    required
    default
  }
  ... on FilePortType {
    __typename
    key
    name
    description
    required
    default
  }
  ... on ListPortType {
    __typename
    key
    name
    description
    required
    default
  }
  ... on ObjectPortType {
    __typename
    key
    name
    description
    required
    default
  }
  ... on ModelPortType {
    __typename
    key
    name
    description
    required
    default
  }
}
    `;
export const Monitorquery = gql`
    query monitorquery($reference: String!) {
  data: monitor(reference: $reference) {
    provider
    pod {
      status
      persistent
      unique
    }
    node {
      id
      inputs {
        __typename
      }
      outputs {
        __typename
      }
    }
  }
}
    `;
export const Monitorsubscribe = gql`
    subscription monitorsubscribe($reference: String!) {
  data: monitor(reference: $reference) {
    pod {
      provider
      status
      persistent
      unique
    }
    node {
      id
      inputs {
        __typename
      }
      outputs {
        __typename
      }
    }
    user {
      username
    }
  }
}
    `;
export const ProvideNode = gql`
    mutation provideNode($node: ID!, $selector: String) {
  provide(node: $node, selector: $selector) {
    node {
      name
    }
    pod {
      id
    }
    provider
    user {
      id
    }
    reference
  }
}
    `;
export const AllNodes = gql`
    query allNodes {
  nodes {
    id
    name
    variety
  }
}
    `;
export const GraphNode = gql`
    query graphNode($id: ID!) {
  node(id: $id) {
    name
    description
    package
    interface
    variety
    outputs {
      ...Ports
    }
    inputs {
      ...Ports
    }
  }
}
    ${Ports}`;
export const CreateGraph = gql`
    mutation createGraph($diagram: GenericScalar!, $name: String!) {
  createGraph(diagram: $diagram, name: $name) {
    status
    graph {
      id
      name
      description
    }
  }
}
    `;
export const ConvertToFlot = gql`
    mutation convertToFlot($graph: ID!) {
  toFlow(graph: $graph) {
    status
    node {
      inputs {
        __typename
      }
      outputs {
        __typename
      }
    }
  }
}
    `;
export const ProvisionNode = gql`
    subscription provisionNode($id: ID!, $reference: String, $selector: String = "@auto") {
  provide(node: $id, selector: $selector, reference: $reference) {
    pod {
      id
      status
      unique
      provider
    }
    node {
      id
      name
      inputs {
        __typename
      }
      outputs {
        __typename
      }
    }
    user {
      username
      firstName
      lastName
    }
    reference
    status
  }
}
    `;