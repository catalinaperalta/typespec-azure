import {
  json,
  MockRequest,
  passOnSuccess,
  ScenarioMockApi,
  ValidationError,
} from "@typespec/spec-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

const SUBSCRIPTION_ID_EXPECTED = "00000000-0000-0000-0000-000000000000";
const RESOURCE_GROUP_EXPECTED = "test-rg";
const validTopLevelResource = {
  id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top`,
  name: "top",
  type: "Azure.ResourceManager.Models.Resources/topLevelTrackedResources",
  location: "eastus",
  properties: {
    provisioningState: "Succeeded",
    description: "valid",
  },
  systemData: {
    createdBy: "AzureSDK",
    createdByType: "User",
    createdAt: "2024-10-04T00:56:07.442Z",
    lastModifiedBy: "AzureSDK",
    lastModifiedAt: "2024-10-04T00:56:07.442Z",
    lastModifiedByType: "User",
  },
};

const validNestedResource = {
  id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/nestedProxyResources/nested`,
  name: "nested",
  type: "Azure.ResourceManager.Models.Resources/topLevelTrackedResources/top/nestedProxyResources",
  properties: {
    provisioningState: "Succeeded",
    description: "valid",
  },
  systemData: {
    createdBy: "AzureSDK",
    createdByType: "User",
    createdAt: "2024-10-04T00:56:07.442Z",
    lastModifiedBy: "AzureSDK",
    lastModifiedAt: "2024-10-04T00:56:07.442Z",
    lastModifiedByType: "User",
  },
};

const validSingletonResource = {
  id: `/subscriptions/${SUBSCRIPTION_ID_EXPECTED}/resourceGroups/${RESOURCE_GROUP_EXPECTED}/providers/Azure.ResourceManager.Models.Resources/singletonTrackedResources/default`,
  name: "default",
  type: "Azure.ResourceManager.Models.Resources/singletonTrackedResources",
  location: "eastus",
  properties: {
    provisioningState: "Succeeded",
    description: "valid",
  },
  systemData: {
    createdBy: "AzureSDK",
    createdByType: "User",
    createdAt: "2024-10-04T00:56:07.442Z",
    lastModifiedBy: "AzureSDK",
    lastModifiedAt: "2024-10-04T00:56:07.442Z",
    lastModifiedByType: "User",
  },
};

// singleton tracked resource
Scenarios.Azure_ResourceManager_Models_Resources_SingletonTrackedResources_getByResourceGroup =
  passOnSuccess({
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/singletonTrackedResources/default",
    method: "get",
    request: {
      params: {
        subscriptionId: SUBSCRIPTION_ID_EXPECTED,
        resourceGroup: RESOURCE_GROUP_EXPECTED,
        "api-version": "2023-12-01-preview",
      },
    },
    response: {
      status: 200,
      body: json(validSingletonResource),
    },
    handler: (req: MockRequest) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError(
          "Unexpected subscriptionId",
          SUBSCRIPTION_ID_EXPECTED,
          req.params.subscriptionId,
        );
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError(
          "Unexpected resourceGroup",
          RESOURCE_GROUP_EXPECTED,
          req.params.resourceGroup,
        );
      }
      return {
        status: 200,
        body: json(validSingletonResource),
      };
    },
    kind: "MockApiDefinition",
  });

Scenarios.Azure_ResourceManager_Models_Resources_SingletonTrackedResources_createOrUpdate =
  passOnSuccess({
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/singletonTrackedResources/default",
    method: "put",
    request: {
      params: {
        subscriptionId: SUBSCRIPTION_ID_EXPECTED,
        resourceGroup: RESOURCE_GROUP_EXPECTED,
        "api-version": "2023-12-01-preview",
      },
      body: {
        location: "eastus",
        properties: {
          description: "valid",
        },
      },
    },
    response: {
      status: 200,
      body: json(validSingletonResource),
    },
    handler: (req: MockRequest) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError(
          "Unexpected subscriptionId",
          SUBSCRIPTION_ID_EXPECTED,
          req.params.subscriptionId,
        );
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError(
          "Unexpected resourceGroup",
          RESOURCE_GROUP_EXPECTED,
          req.params.resourceGroup,
        );
      }
      req.expect.bodyEquals({
        location: "eastus",
        properties: {
          description: "valid",
        },
      });
      return {
        status: 200,
        body: json(validSingletonResource),
      };
    },
    kind: "MockApiDefinition",
  });

Scenarios.Azure_ResourceManager_Models_Resources_SingletonTrackedResources_update = passOnSuccess({
  uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/singletonTrackedResources/default",
  method: "patch",
  request: {
    params: {
      subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      resourceGroup: RESOURCE_GROUP_EXPECTED,
      "api-version": "2023-12-01-preview",
    },
    body: {
      location: "eastus2",
      properties: {
        description: "valid2",
      },
    },
    headers: {
      "Content-Type": "application/merge-patch+json",
    },
  },
  response: {
    status: 200,
    body: json({
      ...validSingletonResource,
      location: "eastus2",
      properties: {
        provisioningState: "Succeeded",
        description: "valid2",
      },
    }),
  },
  handler: (req: MockRequest) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
      throw new ValidationError(
        "Unexpected subscriptionId",
        SUBSCRIPTION_ID_EXPECTED,
        req.params.subscriptionId,
      );
    }
    if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
      throw new ValidationError(
        "Unexpected resourceGroup",
        RESOURCE_GROUP_EXPECTED,
        req.params.resourceGroup,
      );
    }
    req.expect.bodyEquals({
      location: "eastus2",
      properties: {
        description: "valid2",
      },
    });
    const resource = JSON.parse(JSON.stringify(validSingletonResource));
    resource.location = "eastus2";
    resource.properties.description = "valid2";
    return {
      status: 200,
      body: json(resource),
    };
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_Models_Resources_SingletonTrackedResources_listByResourceGroup =
  passOnSuccess({
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/singletonTrackedResources",
    method: "get",
    request: {
      params: {
        subscriptionId: SUBSCRIPTION_ID_EXPECTED,
        resourceGroup: RESOURCE_GROUP_EXPECTED,
        "api-version": "2023-12-01-preview",
      },
    },
    response: {
      status: 200,
      body: json({
        value: [validSingletonResource],
      }),
    },
    handler: (req: MockRequest) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError(
          "Unexpected subscriptionId",
          SUBSCRIPTION_ID_EXPECTED,
          req.params.subscriptionId,
        );
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError(
          "Unexpected resourceGroup",
          RESOURCE_GROUP_EXPECTED,
          req.params.resourceGroup,
        );
      }
      return {
        status: 200,
        body: json({
          value: [validSingletonResource],
        }),
      };
    },
    kind: "MockApiDefinition",
  });

Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_actionSync =
  passOnSuccess({
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName/actionSync",
    method: "post",
    request: {
      params: {
        subscriptionId: SUBSCRIPTION_ID_EXPECTED,
        resourceGroup: RESOURCE_GROUP_EXPECTED,
        topLevelResourceName: "top",
        "api-version": "2023-12-01-preview",
      },
      body: {
        message: "Resource action at top level.",
        urgent: true,
      },
    },
    response: {
      status: 204,
    },
    handler: (req: MockRequest) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError(
          "Unexpected subscriptionId",
          SUBSCRIPTION_ID_EXPECTED,
          req.params.subscriptionId,
        );
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError(
          "Unexpected resourceGroup",
          RESOURCE_GROUP_EXPECTED,
          req.params.resourceGroup,
        );
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "top") {
        throw new ValidationError(
          "Unexpected top level resource name",
          "top",
          req.params.topLevelResourceName,
        );
      }
      req.expect.bodyEquals({
        message: "Resource action at top level.",
        urgent: true,
      });
      return {
        status: 204,
      };
    },
    kind: "MockApiDefinition",
  });

// top level tracked resource
Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_get = passOnSuccess({
  uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName",
  method: "get",
  request: {
    params: {
      subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      resourceGroup: RESOURCE_GROUP_EXPECTED,
      topLevelResourceName: "top",
      "api-version": "2023-12-01-preview",
    },
  },
  response: {
    status: 200,
    body: json(validTopLevelResource),
  },
  handler: (req: MockRequest) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
      throw new ValidationError(
        "Unexpected subscriptionId",
        SUBSCRIPTION_ID_EXPECTED,
        req.params.subscriptionId,
      );
    }
    if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
      throw new ValidationError(
        "Unexpected resourceGroup",
        RESOURCE_GROUP_EXPECTED,
        req.params.resourceGroup,
      );
    }
    if (req.params.topLevelResourceName.toLowerCase() !== "top") {
      throw new ValidationError(
        "Unexpected top level resource name",
        "top",
        req.params.topLevelResourceName,
      );
    }
    return {
      status: 200,
      body: json(validTopLevelResource),
    };
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_createOrReplace =
  passOnSuccess({
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName",
    method: "put",
    request: {
      params: {
        subscriptionId: SUBSCRIPTION_ID_EXPECTED,
        resourceGroup: RESOURCE_GROUP_EXPECTED,
        topLevelResourceName: "top",
        "api-version": "2023-12-01-preview",
      },
      body: {
        location: "eastus",
        properties: {
          description: "valid",
        },
      },
    },
    response: {
      status: 200,
      body: json(validTopLevelResource),
    },
    handler: (req: MockRequest) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError(
          "Unexpected subscriptionId",
          SUBSCRIPTION_ID_EXPECTED,
          req.params.subscriptionId,
        );
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError(
          "Unexpected resourceGroup",
          RESOURCE_GROUP_EXPECTED,
          req.params.resourceGroup,
        );
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "top") {
        throw new ValidationError(
          "Unexpected top level resource name",
          "top",
          req.params.topLevelResourceName,
        );
      }
      req.expect.bodyEquals({
        location: "eastus",
        properties: {
          description: "valid",
        },
      });
      return {
        status: 200,
        body: json(validTopLevelResource),
      };
    },
    kind: "MockApiDefinition",
  });

Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_update = passOnSuccess({
  uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName",
  method: "patch",
  request: {
    params: {
      subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      resourceGroup: RESOURCE_GROUP_EXPECTED,
      topLevelResourceName: "top",
      "api-version": "2023-12-01-preview",
    },
    body: {
      properties: {
        description: "valid2",
      },
    },
    headers: {
      "Content-Type": "application/merge-patch+json",
    },
  },
  response: {
    status: 200,
    body: json({
      ...validTopLevelResource,
      properties: {
        provisioningState: "Succeeded",
        description: "valid2",
      },
    }),
  },
  handler: (req: MockRequest) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
      throw new ValidationError(
        "Unexpected subscriptionId",
        SUBSCRIPTION_ID_EXPECTED,
        req.params.subscriptionId,
      );
    }
    if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
      throw new ValidationError(
        "Unexpected resourceGroup",
        RESOURCE_GROUP_EXPECTED,
        req.params.resourceGroup,
      );
    }
    if (req.params.topLevelResourceName.toLowerCase() !== "top") {
      throw new ValidationError(
        "Unexpected top level resource name",
        "top",
        req.params.topLevelResourceName,
      );
    }
    req.expect.deepEqual(req.body.properties, {
      description: "valid2",
    });
    const resource = JSON.parse(JSON.stringify(validTopLevelResource));
    resource.properties.description = "valid2";
    return {
      status: 200,
      body: json(resource),
    };
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_delete = passOnSuccess({
  uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName",
  method: "delete",
  request: {
    params: {
      subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      resourceGroup: RESOURCE_GROUP_EXPECTED,
      topLevelResourceName: "top",
      "api-version": "2023-12-01-preview",
    },
  },
  response: {
    status: 204,
  },
  handler: (req: MockRequest) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
      throw new ValidationError(
        "Unexpected subscriptionId",
        SUBSCRIPTION_ID_EXPECTED,
        req.params.subscriptionId,
      );
    }
    if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
      throw new ValidationError(
        "Unexpected resourceGroup",
        RESOURCE_GROUP_EXPECTED,
        req.params.resourceGroup,
      );
    }
    if (req.params.topLevelResourceName.toLowerCase() !== "top") {
      throw new ValidationError(
        "Unexpected top level resource name",
        "top",
        req.params.topLevelResourceName,
      );
    }
    return {
      status: 204,
    };
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_listByResourceGroup =
  passOnSuccess({
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources",
    method: "get",
    request: {
      params: {
        subscriptionId: SUBSCRIPTION_ID_EXPECTED,
        resourceGroup: RESOURCE_GROUP_EXPECTED,
        "api-version": "2023-12-01-preview",
      },
    },
    response: {
      status: 200,
      body: json({
        value: [validTopLevelResource],
      }),
    },
    handler: (req: MockRequest) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError(
          "Unexpected subscriptionId",
          SUBSCRIPTION_ID_EXPECTED,
          req.params.subscriptionId,
        );
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError(
          "Unexpected resourceGroup",
          RESOURCE_GROUP_EXPECTED,
          req.params.resourceGroup,
        );
      }
      return {
        status: 200,
        body: json({
          value: [validTopLevelResource],
        }),
      };
    },
    kind: "MockApiDefinition",
  });

Scenarios.Azure_ResourceManager_Models_Resources_TopLevelTrackedResources_listBySubscription =
  passOnSuccess({
    uri: "/subscriptions/:subscriptionId/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources",
    method: "get",
    request: {
      params: {
        subscriptionId: SUBSCRIPTION_ID_EXPECTED,
        "api-version": "2023-12-01-preview",
      },
    },
    response: {
      status: 200,
      body: json({
        value: [validTopLevelResource],
      }),
    },
    handler: (req: MockRequest) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError(
          "Unexpected subscriptionId",
          SUBSCRIPTION_ID_EXPECTED,
          req.params.subscriptionId,
        );
      }
      return {
        status: 200,
        body: json({
          value: [validTopLevelResource],
        }),
      };
    },
    kind: "MockApiDefinition",
  });

// nested proxy resource
Scenarios.Azure_ResourceManager_Models_Resources_NestedProxyResources_get = passOnSuccess({
  uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedProxyResources/:nestedResourceName",
  method: "get",
  request: {
    params: {
      subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      resourceGroup: RESOURCE_GROUP_EXPECTED,
      topLevelResourceName: "top",
      nestedResourceName: "nested",
      "api-version": "2023-12-01-preview",
    },
  },
  response: {
    status: 200,
    body: json(validNestedResource),
  },
  handler: (req: MockRequest) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
      throw new ValidationError(
        "Unexpected subscriptionId",
        SUBSCRIPTION_ID_EXPECTED,
        req.params.subscriptionId,
      );
    }
    if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
      throw new ValidationError(
        "Unexpected resourceGroup",
        RESOURCE_GROUP_EXPECTED,
        req.params.resourceGroup,
      );
    }
    if (req.params.topLevelResourceName.toLowerCase() !== "top") {
      throw new ValidationError(
        "Unexpected top level resource name",
        "top",
        req.params.topLevelResourceName,
      );
    }
    if (req.params.nestedResourceName.toLowerCase() !== "nested") {
      throw new ValidationError(
        "Unexpected nested resource name",
        "nested",
        req.params.nestedResourceName,
      );
    }
    return {
      status: 200,
      body: json(validNestedResource),
    };
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_Models_Resources_NestedProxyResources_createOrReplace =
  passOnSuccess({
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedProxyResources/:nestedResourceName",
    method: "put",
    request: {
      params: {
        subscriptionId: SUBSCRIPTION_ID_EXPECTED,
        resourceGroup: RESOURCE_GROUP_EXPECTED,
        topLevelResourceName: "top",
        nestedResourceName: "nested",
        "api-version": "2023-12-01-preview",
      },
      body: {
        properties: {
          description: "valid",
        },
      },
    },
    response: {
      status: 200,
      body: json(validNestedResource),
    },
    handler: (req: MockRequest) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError(
          "Unexpected subscriptionId",
          SUBSCRIPTION_ID_EXPECTED,
          req.params.subscriptionId,
        );
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError(
          "Unexpected resourceGroup",
          RESOURCE_GROUP_EXPECTED,
          req.params.resourceGroup,
        );
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "top") {
        throw new ValidationError(
          "Unexpected top level resource name",
          "top",
          req.params.topLevelResourceName,
        );
      }
      if (req.params.nestedResourceName.toLowerCase() !== "nested") {
        throw new ValidationError(
          "Unexpected nested resource name",
          "nested",
          req.params.nestedResourceName,
        );
      }
      req.expect.bodyEquals({
        properties: {
          description: "valid",
        },
      });
      return {
        status: 200,
        body: json(validNestedResource),
      };
    },
    kind: "MockApiDefinition",
  });

Scenarios.Azure_ResourceManager_Models_Resources_NestedProxyResources_update = passOnSuccess({
  uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedProxyResources/:nestedResourceName",
  method: "patch",
  request: {
    params: {
      subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      resourceGroup: RESOURCE_GROUP_EXPECTED,
      topLevelResourceName: "top",
      nestedResourceName: "nested",
      "api-version": "2023-12-01-preview",
    },
    body: {
      properties: {
        description: "valid2",
      },
    },
    headers: {
      "Content-Type": "application/merge-patch+json",
    },
  },
  response: {
    status: 200,
    body: json({
      ...validNestedResource,
      properties: {
        provisioningState: "Succeeded",
        description: "valid2",
      },
    }),
  },
  handler: (req: MockRequest) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
      throw new ValidationError(
        "Unexpected subscriptionId",
        SUBSCRIPTION_ID_EXPECTED,
        req.params.subscriptionId,
      );
    }
    if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
      throw new ValidationError(
        "Unexpected resourceGroup",
        RESOURCE_GROUP_EXPECTED,
        req.params.resourceGroup,
      );
    }
    if (req.params.topLevelResourceName.toLowerCase() !== "top") {
      throw new ValidationError(
        "Unexpected top level resource name",
        "top",
        req.params.topLevelResourceName,
      );
    }
    if (req.params.nestedResourceName.toLowerCase() !== "nested") {
      throw new ValidationError(
        "Unexpected nested resource name",
        "nested",
        req.params.nestedResourceName,
      );
    }
    req.expect.bodyEquals({
      properties: {
        description: "valid2",
      },
    });
    const resource = JSON.parse(JSON.stringify(validNestedResource));
    resource.properties.description = "valid2";
    return {
      status: 200,
      body: json(resource),
    };
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_Models_Resources_NestedProxyResources_delete = passOnSuccess({
  uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedProxyResources/:nestedResourceName",
  method: "delete",
  request: {
    params: {
      subscriptionId: SUBSCRIPTION_ID_EXPECTED,
      resourceGroup: RESOURCE_GROUP_EXPECTED,
      topLevelResourceName: "top",
      nestedResourceName: "nested",
      "api-version": "2023-12-01-preview",
    },
  },
  response: {
    status: 204,
  },
  handler: (req: MockRequest) => {
    req.expect.containsQueryParam("api-version", "2023-12-01-preview");
    return {
      status: 204,
    };
  },
  kind: "MockApiDefinition",
});

Scenarios.Azure_ResourceManager_Models_Resources_NestedProxyResources_listByTopLevelTrackedResource =
  passOnSuccess({
    uri: "/subscriptions/:subscriptionId/resourceGroups/:resourceGroup/providers/Azure.ResourceManager.Models.Resources/topLevelTrackedResources/:topLevelResourceName/nestedProxyResources",
    method: "get",
    request: {
      params: {
        subscriptionId: SUBSCRIPTION_ID_EXPECTED,
        resourceGroup: RESOURCE_GROUP_EXPECTED,
        topLevelResourceName: "top",
        "api-version": "2023-12-01-preview",
      },
    },
    response: {
      status: 200,
      body: json({
        value: [validNestedResource],
      }),
    },
    handler: (req: MockRequest) => {
      req.expect.containsQueryParam("api-version", "2023-12-01-preview");
      if (req.params.subscriptionId !== SUBSCRIPTION_ID_EXPECTED) {
        throw new ValidationError(
          "Unexpected subscriptionId",
          SUBSCRIPTION_ID_EXPECTED,
          req.params.subscriptionId,
        );
      }
      if (req.params.resourceGroup.toLowerCase() !== RESOURCE_GROUP_EXPECTED) {
        throw new ValidationError(
          "Unexpected resourceGroup",
          RESOURCE_GROUP_EXPECTED,
          req.params.resourceGroup,
        );
      }
      if (req.params.topLevelResourceName.toLowerCase() !== "top") {
        throw new ValidationError(
          "Unexpected top level resource name",
          "top",
          req.params.topLevelResourceName,
        );
      }
      return {
        status: 200,
        body: json({
          value: [validNestedResource],
        }),
      };
    },
    kind: "MockApiDefinition",
  });
