import AccessControl "authorization/access-control";
import List "mo:core/List";
import Map "mo:core/Map";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";

actor {
  type Status = {
    #pending;
    #inProgress;
    #completed;
  };

  type OrderRecord = {
    timestamp : Time.Time;
    businessName : Text;
    niche : Text;
    numPosts : Nat;
    stylePreferences : Text;
    colorPalette : Text;
    logoURL : Text;
    status : Status;
  };

  public type UserProfile = {
    name : Text;
  };

  module OrderRecord {
    public func compare(order1 : OrderRecord, order2 : OrderRecord) : Order.Order {
      Text.compare(order1.businessName, order2.businessName);
    };
  };

  let orders = Map.empty<Text, OrderRecord>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let nextId = List.empty<Nat>();
  nextId.add(1);

  func getNextId() : ?Nat {
    do {
      let ?currentId = nextId.first();
      nextId.add(currentId + 1);
      ?currentId;
    };
  };

  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles. ");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile. ");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles. ");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitOrder(order : OrderRecord) : async ?Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can submit orders. ");
    };
    switch (getNextId()) {
      case (null) { Runtime.trap("Failed to generate a new ID") };
      case (?id) {
        let newOrder : OrderRecord = {
          order with
          timestamp = Time.now();
          status = #pending;
        };
        orders.add(id.toText(), newOrder);
        ?id.toText();
      };
    };
  };

  public query ({ caller }) func getAllOrders() : async [OrderRecord] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all orders. ");
    };
    orders.values().toArray().sort();
  };

  public query ({ caller }) func getOrderById(id : Text) : async OrderRecord {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view orders by id. ");
    };
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  public shared ({ caller }) func updateOrderStatus(id : Text, status : Status) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status. ");
    };
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        orders.add(
          id,
          {
            order with
            status;
          },
        );
      };
    };
  };
};
