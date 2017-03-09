import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function() {
    this.route("identities", function() {
        this.modal("delete-modal", {
            withParams: ["deleteObjectId"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("identity", { path: "/identities/:id" }, function() {
        this.modal("delete-modal", {
            withParams: ["onDeleteNavigateTo"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("identity-new", { path: "/identities/new" });
    this.route("identity-edit", { path: "/identity/edit/:id" });

    this.route("campaigns", function() {
        this.modal("delete-modal", {
            withParams: ["deleteObjectId"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("campaign", { path: "/campaigns/:id" }, function() {
        this.modal("delete-modal", {
            withParams: ["onDeleteNavigateTo"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("campaign-new", { path: "/campaign/new" });
    this.route("campaign-edit", { path: "/campaigns/edit/:id" });

    this.route("sightings", function() {
        this.modal("delete-modal", {
            withParams: ["deleteObjectId"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("sighting", { path: "/sightings/:id" }, function() {
        this.modal("delete-modal", {
            withParams: ["onDeleteNavigateTo"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("sighting-new", { path: "/sighting/new" });
    this.route("sighting-edit", { path: "/sighting/edit/:id" });

    this.route("attack-patterns", function() {
        this.modal("delete-modal", {
            withParams: ["deleteObjectId"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("attack-pattern", { path: "/attack-patterns/:id" }, function() {
        this.modal("delete-modal", {
            withParams: ["onDeleteNavigateTo"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("attack-pattern-new", { path: "/attack-pattern/new" });
    this.route("attack-pattern-edit", { path: "/attack-pattern/edit/:id" });

    this.route("threat-actors", function() {
        this.modal("delete-modal", {
            withParams: ["deleteObjectId"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("threat-actor", { path: "/threat-actors/:id" }, function() {
        this.modal("delete-modal", {
            withParams: ["onDeleteNavigateTo"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("threat-actor-new", { path: "/threat-actors/new" });
    this.route("threat-actor-edit", { path: "/threat-actor/edit/:id" });

    this.route("tool", { path: "/tools/:id" });

    this.route("course-of-actions", function() {
        this.modal("delete-modal", {
            withParams: ["deleteObjectId"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("course-of-action", { path: "/course-of-actions/:id" }, function() {
        this.modal("delete-modal", {
            withParams: ["onDeleteNavigateTo"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("course-of-action-new", { path: "/course-of-actions/new" });
    this.route("course-of-action-edit", { path: "/course-of-action/edit/:id" });

    this.route("indicators", function() {
        this.modal("delete-modal", {
            withParams: ["deleteObjectId"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("indicator", { path: "/indicators/:id" }, function() {
        this.modal("delete-modal", {
            withParams: ["onDeleteNavigateTo"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("indicator-new", { path: "/indicator/new" });
    this.route("indicator-edit", { path: "/indicators/edit/:id" });

    this.route("malware", { path: "/malwares/:id" });
    this.route("relationships", function() {
        this.modal("delete-modal", {
            withParams: ["deleteObjectId"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("relationship", { path: "/relationships/:id" });
    this.route("relationship-new", { path: "/relationships/new" });
    this.route("relationship-grid", { path: "/relationships/mitigates" }, function() {
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });

    this.route("relationship-intrusion-uses-attack", { path: "/relationships/intrusion-uses-attack" }, function() {
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("intrusion-sets", function() {
        this.modal("delete-modal", {
            withParams: ["deleteObjectId"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("intrusion-set", { path: "/intrusion-sets/:id" }, function() {
        this.modal("delete-modal", {
            withParams: ["onDeleteNavigateTo"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("intrusion-set-new", { path: "/intrusion-set/new" });
    this.route("intrusion-set-edit", { path: "/intrusion-sets/edit/:id" });

    this.route("sightings", function() {
        this.modal("delete-modal", {
            withParams: ["deleteObjectId"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
   this.route("reports", function() {
        this.modal("delete-modal", {
            withParams: ["deleteObjectId"],
            otherParams: {
                deleteObject: "deleteObject"
            },
            actions: {
                deleteConfirmed: "deleteConfirmed"
            }
        });
        this.modal("alert-modal", {
            withParams: ["alertObjectId"],
            otherParams: {
                alert: "alert"
            }
        });
    });
    this.route("report", { path: "/reports/:id" });
    this.route("report-new", { path: "/report/new" });
    this.route("partners", { path: "/partners" });
});

export default Router;
